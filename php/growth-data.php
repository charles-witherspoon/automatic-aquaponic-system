<?php
header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Content-Type: application/json');


class GrowthData implements JsonSerializable
{
    private $_id;
    private $_date;
    private $_growth;

    public function __construct($id, $date, $growth)
    {
        $this->_id = $id;
        $this->_date = $date;
        $this->_growth = $growth;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->_id,
            'date' => $this->_date,
            'growth' => $this->_growth,
        ];
    }
}

class GrowthDataDataAccess
{
    private $_db;

    public function __construct(SQLite3 $db)
    {
        $this->_db = $db;

        // Create Growth Data table if necessary
        $db->exec("CREATE TABLE IF NOT EXISTS growth_data(id INTEGER PRIMARY KEY, plantId INTEGER, date TEXT, growth INTEGER, FOREIGN KEY(plantId) REFERENCES plants(id), UNIQUE(plantId, date));");
    }

    public function getGrowthData($plantId)
    {
        $growthData = [];

        $statement = $this->_db->prepare('SELECT * FROM growth_data WHERE plantId = :plantId');
        $statement->bindValue(':plantId', $plantId);

        $result = $statement->execute();
        while ($row = $result->fetchArray()) {
            $data = new GrowthData($row['id'], $row['date'], $row['growth']);
            array_push($growthData, $data);
        }

        return $growthData;
    }

    public function deleteGrowthData($id)
    {
        $statement = $this->_db->prepare('DELETE FROM growth_data WHERE id = :id');
        $statement->bindValue(':id', $id);
        $statement->execute();
    }

    public function addGrowthData($plantId, $date, $growth)
    {
        $statement = $this->_db->prepare('INSERT INTO growth_data(plantId, date, growth) VALUES (:plantId, :date, :growth);');
        $statement->bindValue(':plantId', $plantId);
        $statement->bindValue(':date', $date);
        $statement->bindValue(':growth', $growth);

        $statement->execute();
    }
}


function handleGet($growthDataDB)
{
    $plantId = $_GET['plantId'];

    if ($plantId) {
        echo json_encode($growthDataDB->getGrowthData($plantId));
    }
}

function handlePost($growthDataDB)
{
    $json = file_get_contents('php://input');

    $growthDataArr = json_decode($json);

    foreach ($growthDataArr as &$data) {
        $growthDataDB->addGrowthData($data->plantId, $data->date, $data->growth);
    }
}

function handleDelete($growthDataDB)
{
    $id = $_REQUEST['id'];
    $growthDataDB->deleteGrowthData($id);
}


$db = new SQLite3('/mnt/c/dev/repos/senior-design/automatic-aquaponic-system/db/automatic-aquaponic-system.db');
$db->busyTimeout(3000);
$growthDataDB = new GrowthDataDataAccess($db);

try {
    // Handle GET
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        handleGet($growthDataDB);
    }
    // Handle POST
    elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        handlePost($growthDataDB);
    }
    // Handle DELETE
    elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        handleDelete($growthDataDB);
    }
} catch (Exception $e) {
    echo 'Caught exception: ', $e->getMessage(), "\n";
} finally {
    $db->close();
    unset($db);
}
