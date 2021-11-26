<?php
header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Content-Type: application/json');

class Socket implements JsonSerializable {
    private $_id;
    private $_type;
    private $_schedule;
    private $_status;

    public function __construct($id, $type, $schedule, $status) {
        $this->_id = $id;
        $this->_type = $type;
        $this->_schedule = $schedule;
        $this->_status = $status;
    }

    public function jsonSerialize() {
        return [
            'id' => $this->_id,
            'type' => $this->_type,
            'schedule' => $this->_schedule,
            'status' => $this->_status
        ];
    }


    public function getId() {
        return $this->_id;
    }

    public function setType($type) {
        $this->_type = $type;
    }

    public function getType() {
        return $this->_type;
    }

    public function setSchedule($schedule) {
        $this->_schedule = $schedule;
    }

    public function getSchedule() {
        return $this->_schedule;
    }

    public function setStatus($status) {
        $this->_status = $status;
    }

    public function getStatus() {
        return $this->_status;
    }
}

class SocketDataAccess {

    private $_db;

    public function __construct(SQLite3 $db) {
        $this->_db = $db;
        // Create sockets table if necessary
        $db->exec("CREATE TABLE IF NOT EXISTS sockets(id INTEGER PRIMARY KEY, type TEXT, schedule TEXT, status TEXT);");

        // Initialized to default if empty
        $count = $db->querySingle("SELECT COUNT(*) as count FROM sockets");
        if ($count == 0) {
            $db->exec("INSERT INTO sockets(type, schedule, status) VALUES ('NONE', '{}', 'OFF'), ('NONE', '{}', 'OFF'), ('NONE', '{}', 'OFF'), ('NONE', '{}', 'OFF'), ('NONE', '{}', 'OFF'), ('NONE', '{}', 'OFF'), ('NONE', '{}', 'OFF'), ('NONE', '{}', 'OFF');");
        }
    }

    public function getSockets() {
        $sockets = [];

        $result = $this->_db->query('SELECT * FROM sockets;');
        while ($row = $result->fetchArray()) {
            $socket = new Socket($row['id'], $row['type'], $row['schedule'], $row['status']);
            array_push($sockets, $socket);
        }

        return $sockets;
    }
    
    public function getSocket($id) {
        $statement = $this->_db->prepare('SELECT * FROM sockets WHERE id = :id;');
        $statement->bindValue(':id', $id);

        $result = $statement->execute();
        $row = $result->fetchArray();
        if ($row) {
            return new Socket($row['id'], $row['type'], $row['schedule'], $row['status']);
        }

        return null;
    }
    
    public function updateSocket($update) {
        // Save to database
        $statement = $this->_db->prepare('UPDATE sockets SET type = :type, schedule = :schedule, status = :status WHERE id = :id;');
        $statement->bindValue(':id', $update->id);
        $statement->bindValue(':type', $update->type);
        $statement->bindValue(':schedule', $update->schedule);
        $statement->bindValue(':status', $update->status);

        $statement->execute();

        // Call Perl script to update socket status
        $id = $update->id;
        $status = ($update->status == 'OFF') ? 0 : 1;
        $command = "turnsocket.pl $id $status";
        shell_exec($command);
    }
}


function handleGet($socketDB) {
    // GET: Get all sockets
    if (empty($_GET)) {
        $sockets = $socketDB->getSockets();
        echo json_encode($sockets);
    } else {
        // GET: Get socket by ID
        $id = $_GET['id'];
        if ($id) {
            echo json_encode($socketDB->getSocket($id));
        }
    }
}

function handlePost($socketDB) {
    // POST: Update socket
    $json = file_get_contents('php://input');

    $socket = json_decode($json);

    if ($socket) {
        $socketDB->updateSocket($socket);
    }
}



$db = new SQLite3('/home/pi/db/automatic-aquaponic-system.db');
$db->busyTimeout(3000);
$socketDB = new SocketDataAccess($db);

try {
    // Handle GET
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        handleGet($socketDB);
    }

    // Handle POST
    elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        handlePost($socketDB);
    }
} catch (Exception $e) {
    echo 'Caught exception: ', $e->getMessage(), "\n";
} finally {
    $db->close();
    unset($db);
}
