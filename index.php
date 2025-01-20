<?php
require './conn.php';
?>
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Concillation</title>
        <link rel="stylesheet" href="./assets/css/bootstrap.min.css">
        <link rel="stylesheet" href="./assets/css/style.css">
    </head>

    <body>
        <main class="py-4">
            <div class="container">
                <div class="row py-2 align-items-center">
                    <div class="col-3 text-center">
                        <h5 class="mb-0">Account</h5>
                    </div>
                    <div class="col-9 text-center">
                        <select name="account_number" id="account_number" class="form-select">
                            <?php
                            // Query to fetch all 'codigo' entries from the table 'cont_catalogocuentas'
                            $sql = "SELECT codigo FROM cont_catalogocuentas";
                            $result = $conn->query($sql);

                            if ($result->num_rows > 0) {
                                while ($row = $result->fetch_assoc()) {
                                    // Create an option for each 'codigo'
                                    echo '<option value="' . htmlspecialchars($row['codigo']) . '">' . htmlspecialchars($row['codigo']) . '</option>';
                                }
                            } else {
                                echo '<option value="">No accounts present!</option>';
                            }
                            ?>
                        </select>
                    </div>
                </div>
                <div class="row py-2 align-items-center">
                    <div class="col-3 text-center">
                        <h5 class="mb-0">Range of dates</h5>
                    </div>
                    <div class="col-9 text-center">
                        <div class="row align-items-center">
                            <div class="col-6">
                                <input type="date" class="form-control" id="date_1" name="date_1">
                            </div>
                            <div class="col-6">
                                <input type="date" class="form-control" id="date_2" name="date_2">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row py-2 align-items-center">
                    <div class="col-3 text-center">
                    </div>
                    <div class="col-9 text-center">
                        <div class="row align-items-center">
                            <div class="col-6 d-flex gap-2">
                                <button class="btn-primary btn flex-grow-1" id="btn_concillate">Concillate</button>
                                <button class="btn-success btn flex-grow-1" id="btn_save">Save</button>
                            </div>
                            <div class="col-6 d-flex gap-2">
                                <button class="btn-warning btn flex-grow-1" id="btn_clean">Clean</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mt-4">
                        <div class="progress" style="display: none; height: 1.5rem !important">
                            <div class="progress-bar progress-bar-striped" role="progressbar" style="width: 0%"
                                aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div id="response"></div>
                    </div>
                </div>
                <div class="row py-2 mt-4">
                    <div class="col-5">
                        <h4 class="text-center">Account Movements</h4>
                        <button class="btn btn-info" id="search_1">Search 1</button>
                        <table class="mt-4 table table-bordered" id="table_1">
                            <thead class="table-primary">
                                <tr>
                                    <th>id_registro</th>
                                    <th>id_transaccion</th>
                                    <th>monto</th>
                                    <th>fecha</th>
                                    <th>status</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-7">
                        <h4 class="text-center">Extract Movements</h4>
                        <button class="btn btn-info" id="search_2">Search 2</button>
                        <table class="mt-4 table table-bordered" id="table_2">
                            <thead class="table-primary">
                                <tr>
                                    <th>Referencia_28c</th>
                                    <th>referencia_61 </th>
                                    <th>tipo_trx_61</th>
                                    <th>monto_trx_60F</th>
                                    <th>fecha_mov_60F</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
        <script src="./assets/js/jquery.min.js"></script>
        <script src="./assets/js/bootstrap.min.js"></script>
        <script src="./assets/js/script.js"></script>
    </body>

</html>