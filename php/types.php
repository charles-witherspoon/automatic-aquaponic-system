<?php
header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Content-Type: application/json');

class Type implements JsonSerializable
{
    private $_id;
    private $_value;

    public function __construct($id, $value)
    {
        $this->_id = $id;
        $this->_value = $value;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->_id,
            'value' => $this->_value
        ];
    }
}

class TypeDataAccess
{
    private $_db;

    public function __construct(SQLITE3 $db)
    {
        $this->_db = $db;

        // Create types table if necessary
        $db->exec("CREATE TABLE IF NOT EXISTS types(id INTEGER PRIMARY KEY, value TEXT);");

        // INITIALIZE to default if empty
        $count = $db->querySingle("SELECT COUNT(*) as count FROM types;");
        if ($count == 0) {
            $db->exec("INSERT INTO types(value) VALUES ('NONE');");
        }
    }

    public function getTypes()
    {
        $types = [];

        $result = $this->_db->query('SELECT * FROM types;');
        while ($row = $result->fetchArray()) {
            $type = new Type($row['id'], $row['value']);
            array_push($types, $type);
        }

        return $types;
    }

    public function addType($type)
    {
        $statement = $this->_db->prepare('INSERT INTO types(value) VALUES (:type);');
        $statement->bindValue(':type', $type);
        $statement->execute();
    }

    public function deleteType($id)
    {
        $statement = $this->_db->prepare('DELETE FROM types WHERE id = :id;');
        $statement->bindValue(':id', $id);
        $statement->execute();
    }
}

function handleGet($typesDB)
{
    $types = $typesDB->getTypes();
    echo json_encode($types);
}

function handlePost($typesDB)
{
    $json = file_get_contents('php://input');
    $type = json_decode($json);

    $typesDB->addType($type->value);
}

function handleDelete($typesDB)
{
    $id = $_REQUEST['id'];
    $typesDB->deleteType($id);
    echo $id;
}

$db = new SQLite3('/mnt/c/dev/repos/senior-design/automatic-aquaponic-system/db/automatic-aquaponic-system.db');
$db->busyTimeout(3000);
$typesDB = new TypeDataAccess($db);

try {
    // Handle GET
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        handleGet($typesDB);
    }

    // Handle POST
    elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        handlePost($typesDB);
    }

    // Handle DELETE
    elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        handleDelete($typesDB);
    }
} catch (Exception $e) {
    echo 'Caught exception: ', $e->getMessage(), "\n";
} finally {
    $db->close();
    unset($db);
}
