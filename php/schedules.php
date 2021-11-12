<?php
header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Content-Type: application/json');


class Schedule implements JsonSerializable {
    private $_id;
    private $_cronString;
    private $_socketId;

    public function __construct($id, $cronString, $socketId) {
        $this->_id = $id;
        $this->_cronString = $cronString;
        $this->_socketId = $socketId;

    }

    public function jsonSerialize() {
        return [
            'id' => $this->_id,
            'cronString' => $this->_cronString,
            'socketId' => $this->_socketId
        ];
    }
}

class ScheduleDataAccess {
    private $_db;

    public function __construct(SQLITE3 $db) {
        $this->_db = $db;

        // Create schedules table if necessary
        $db->exec("CREATE TABLE IF NOT EXISTS schedules(id INTEGER PRIMARY KEY, cronString TEXT, socketId INTEGER, FOREIGN KEY(socketId) REFERENCES sockets(id));");
    }

    public function getSchedules() {
        $schedules = [];

        $result = $this->_db->query('SELECT * FROM schedules;');
        while ($row = $result->fetchArray()) {
            $schedule = new Schedule($row['id'], $row['cronString'], $row['socketId']);
            array_push($schedules, $schedule);
        }

        return $schedules;
    }

    public function addSchedule($schedule) {
        $statement = $this->_db->prepare('INSERT INTO schedules(cronString, socketId) VALUES (:cronString, :socketId);');
        $statement->bindValue(':cronString', $schedule->cronString);
        $statement->bindValue(':socketId', $schedule->socketId);
        $statement->execute();
    }
}


function handleGet($schedulesDB) {
    $schedules = $schedulesDB->getSchedules();
    echo json_encode($schedules);
}

function handlePost($schedulesDB) {
    $json = file_get_contents('php://input');
    $schedule = json_decode($json);

    $schedulesDB->addSchedule($schedule);
}

$db = new SQLite3('/mnt/c/dev/repos/senior-design/automatic-aquaponic-system/db/automatic-aquaponic-system.db');
$db->busyTimeout(3000);
$schedulesDB = new ScheduleDataAccess($db);

try {
    // Handle GET
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        handleGet($schedulesDB);
    }

    // Handle POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        handlePost($schedulesDB);
    }
} catch (Exception $e) {
    echo 'Caught exception: ', $e->getMessage(), "\n";
} finally {
    $db->close();
    unset($db);
}