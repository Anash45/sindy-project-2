<?php
require_once './conn.php';
// print_r($_REQUEST);
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $table1 = $_POST['table1'] ?? [];
    $table2 = $_POST['table2'] ?? [];
    // Begin transaction
    $conn->begin_transaction();

    try {
        // Loop through table1 and table2 data to find matches and update statuses
        foreach ($table1 as $index => $row1) {
            $id_registro = $conn->real_escape_string($row1['id_registro']);
            $id_transaccion = $conn->real_escape_string($row1['id_transaccion']);
            $monto = $conn->real_escape_string($row1['monto']);
            $fecha = $conn->real_escape_string($row1['fecha']);

            // Get corresponding row in table2
            $row2 = $table2[$index] ?? null;

            if ($row2) {
                $Referencia_28c = $conn->real_escape_string($row2['Referencia_28c']);
                $tipo_trx_61 = $conn->real_escape_string($row2['tipo_trx_61']);
                $monto_trx_60F = $conn->real_escape_string($row2['monto_trx_60F']);
                $fecha_mov_60F = $conn->real_escape_string($row2['fecha_mov_60F']);

                // Match conditions
                if (
                    $id_transaccion === $tipo_trx_61 &&
                    $monto === $monto_trx_60F &&
                    $fecha === $fecha_mov_60F
                ) {
                    // Update status to 'R' in librodiario
                    $updateLibroDiario = "
                        UPDATE librodiario
                        SET status = 'R'
                        WHERE id_registro = '$id_registro'
                          AND id_transaccion = '$id_transaccion'
                          AND monto = '$monto'
                          AND fecha = '$fecha'
                          AND status = 'NR'
                    ";
                    $conn->query($updateLibroDiario);

                    // Update status to 'R' in cont_extracto
                    $updateContExtracto = "
                        UPDATE cont_extracto
                        SET status = 'R'
                        WHERE Referencia_28c = '$Referencia_28c'
                          AND tipo_trx_61 = '$tipo_trx_61'
                          AND monto_trx_60F = '$monto_trx_60F'
                          AND fecha_mov_60F = '$fecha_mov_60F'
                          AND status = 'NR'
                    ";
                    $conn->query($updateContExtracto);
                }
            }
        }

        // Commit transaction
        $conn->commit();

        // Response
        echo json_encode(['status' => 'success', 'message' => 'Transactions reconciled and statuses updated successfully.']);
    } catch (Exception $e) {
        // Rollback transaction on error
        $conn->rollback();
        echo json_encode(['status' => 'error', 'message' => 'Failed to reconcile transactions. ' . $e->getMessage()]);
    } finally {
        $conn->close();
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
