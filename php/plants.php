<?php
header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Content-Type: application/json');

class Plant implements JsonSerializable {
    private $_id;
    private $_name;
    private $_growthData;

    public function __construct($id, $name, $growthData) {
        $this->_id = $id;
        $this->_name = $name;
        $this->_growthData = $growthData;
    }

    public function jsonSerialize() {
        return [
            'id' => $this->_id,
            'name' => $this->_name,
            'growthData' => $this->_growthData,
        ];
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
   
   
    function createPlant($name) {
        $statement = $this->_db->prepare('INSERT INTO plants(name) VALUES (:name);');
        $statement->bindValue(':name', $name);
        $statement->execute();
    }
   
    function updatePlant($update) {
        $statement = $this->_db->prepare('UPDATE plants SET name = :name, growthData = :growthData WHERE id = :id;');
        $statement->bindValue(':id', $update->id);
        $statement->bindValue(':name', $update->name);
        $statement->bindValue(':growthData', $update->growthData);

        $statement->execute();
    }
   
    function deletePlant($id) {
        $statement = $this->_db->prepare('DELETE FROM plants WHERE id = :id;');
        $statement->bindValue(':id', $id);
        $statement->execute();
    }
}


function handleGet($plantDB) {
    // GET: Get plant by ID
    $id = $_GET['id'];
    if ($id) {
        echo json_encode($plantDB->getPlant($id));
    } 

    // GET: Get all plants
    else {
        $plants = $plantDB->getPlants();
        echo json_encode($plants);
    }
}

function handlePost($plantDB) {
    $json = file_get_contents('php://input');
    $plant = json_decode($json);

    // POST: Update plant
    if (isset($plant->id)) {
        $plantDB->updatePlant($plant);
    }
    // POST: Add new plant
    else {
        $plantDB->createPlant($plant->name);
    }
    
}

function handleDelete($plantDB) {
    // DELETE: Delete a plant
    $id = $_REQUEST['id'];
    $plantDB->deletePlant($id);
}


$db = new SQLite3('/mnt/c/dev/repos/senior-design/automatic-aquaponic-system/db/automatic-aquaponic-system.db');
$db->busyTimeout(3000);
$plantDB = new PlantDataAccess($db);


try {
    // Handle GET
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        handleGet($plantDB);
    }
    
    // Handle POST
    elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        handlePost($plantDB);
    }
    
    // Handle DELETE
    elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        handleDelete($plantDB);
    }
} catch (Exception $e) {
    echo 'Caught exception: ', $e->getMessage(), "\n";
} finally {
    $db->close();
    unset($db);
}
