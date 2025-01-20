<?php
require './conn.php'; // Include your database connection

header('Content-Type: application/json');

$response = [];

// Check if required parameters are set
if (isset($_POST['date_1'], $_POST['date_2'], $_POST['account'])) {
    $date1 = $_POST['date_1'];
    $date2 = $_POST['date_2'];
    $account = $_POST['account'];

    // Validate date format
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date1) || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $date2)) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid date format. Dates must be in YYYY-MM-DD format.',
        ]);
        exit;
    }

    // SQL query to fetch data
    $sql = "SELECT Referencia_28c, referencia_61, tipo_trx_61, monto_trx_60F, fecha_mov_60F, status 
            FROM cont_extracto 
            WHERE fecha_mov_60F BETWEEN '$date1' AND '$date2' AND `status` = 'NR' AND `Cta_banco_25` = '$account'";

    $result = $conn->query($sql);

    if ($result) {
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        $response = [
            'status' => 'success',
            'data' => $data,
        ];
    } else {
        $response = [
            'status' => 'error',
            'message' => 'Query failed: ' . $conn->error,
        ];
    }
} else {
    $response = [
        'status' => 'error',
        'message' => 'Missing or invalid parameters.',
    ];
}

// Output the JSON response
echo json_encode($response);

// Close the connection
$conn->close();
