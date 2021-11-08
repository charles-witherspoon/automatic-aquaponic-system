<?php

/**
 * DTOs
 */

// Socket
class Socket {
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

    public function __toString() {
        return "{id: $this->_id, type: $this->_type, schedule: $this->_schedule, status: $this->_status}";
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
            $db->exec("INSERT INTO sockets(type, schedule, status) VALUES ('NONE', '{}', 'UNUSED');");
            $db->exec("INSERT INTO sockets(type, schedule, status) VALUES ('NONE', '{}', 'UNUSED');");
            $db->exec("INSERT INTO sockets(type, schedule, status) VALUES ('NONE', '{}', 'UNUSED');");
            $db->exec("INSERT INTO sockets(type, schedule, status) VALUES ('NONE', '{}', 'UNUSED');");
            $db->exec("INSERT INTO sockets(type, schedule, status) VALUES ('NONE', '{}', 'UNUSED');");
            $db->exec("INSERT INTO sockets(type, schedule, status) VALUES ('NONE', '{}', 'UNUSED');");
            $db->exec("INSERT INTO sockets(type, schedule, status) VALUES ('NONE', '{}', 'UNUSED');");
            $db->exec("INSERT INTO sockets(type, schedule, status) VALUES ('NONE', '{}', 'UNUSED');");
        }
        $count = $db->querySingle("SELECT COUNT(*) as count FROM sockets");
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
        $statement = $this->_db->prepare('UPDATE sockets SET type = :type, schedule = :schedule, status = :status WHERE id = :id;');
        $statement->bindValue(':id', $update->getId());
        $statement->bindValue(':type', $update->getType());
        $statement->bindValue(':schedule', $update->getSchedule());
        $statement->bindValue(':status', $update->getStatus());

        $statement->execute();
    }
}
    

// Plant
class Plant {
    private $_id;
    private $_name;
    private $_growthData;

    public function __construct($id, $name, $growthData) {
        $this->_id = $id;
        $this->_name = $name;
        $this->_growthData = $growthData;
    }

    public function __toString() {
        return "{id: $this->_id, name: $this->_name, growthData:$this->_growthData}";
    }

    public function getId() {
        return $this->_id;
    }
    
    public function setName($name) {
        $this->_name = $name;
    }

    public function getName() {
        return $this->_name;
    }
    
    public function setGrowthData($data) {
        $this->_growthData = $data;
    }

    public function getGrowthData() {
        return $this->_growthData;
    }
}

class PlantDataAccess {

    private $_db;

    public function __construct($db) {
        $this->_db = $db;

        // Create Plants Table
        $db->exec("CREATE TABLE IF NOT EXISTS plants(id INTEGER PRIMARY KEY, name TEXT, growthData TEXT);");
    }

    function getPlants() {
        $plants = [];

        $result = $this->_db->query('SELECT * FROM plants;');
        while ($row = $result->fetchArray()) {
            $plant = new Plant($row['id'], $row['name'], $row['growthData']);
            array_push($plants, $plant);
        }

        return $plants;
    }
   
    function getPlant($id) {
        $statement = $this->_db->prepare('SELECT * FROM plants WHERE id = :id;');
        $statement->bindValue(':id', $id);

        $result = $statement->execute();
        $row = $result->fetchArray();
        if ($row) {
            return new Plant($row['id'], $row['name'], $row['growthData']);
        }

        return null;
    }
   
   
    function createPlant($plant) {
        $statement = $this->_db->prepare('INSERT INTO plants(name, growthData) VALUES (:name, :growthData);');
        $statement->bindValue(':name', $plant->getName());
        $statement->bindValue(':growthData', $plant->getGrowthData());
        $statement->execute();
    }
   
    function updatePlant($update) {
        $statement = $this->_db->prepare('UPDATE plants SET name = :name, growthData = :growthData WHERE id = :id;');
        $statement->bindValue(':id', $update->getId());
        $statement->bindValue(':name', $update->getName());
        $statement->bindValue(':growthData', $update->getGrowthData());

        $statement->execute();
    }
   
    function deletePlant($id) {
        $statement = $this->_db->prepare('DELETE FROM plants WHERE id = :id;');
        $statement->bindValue(':id', $id);
        $statement->execute();
    }
}

/**
* Initialization
*/

// Create Database
$db = new SQLite3('/mnt/c/dev/repos/senior-design/automatic-aquaponic-system/db/automatic-aquaponic-system.db');

$socketDB = new SocketDataAccess($db);
$plantsDB = new PlantDataAccess($db);

echo "Plants:\n" . implode("\n", $plantsDB->getPlants()) . "\n\n";

$plantsDB->deletePlant(3);

echo "Plants:\n" . implode("\n", $plantsDB->getPlants());
