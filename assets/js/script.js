let step = 'first';
$('#search_1').on('click', function () {
  let date1 = $('#date_1');
  let date2 = $('#date_2');
  let account_number = $('#account_number');
  let response = $('#response'); // Assuming you have a div with ID 'response' to display messages

  // Clear the response initially
  response.html('');

  if (date1.val() && date2.val()) {
    // Convert the dates to a comparable format
    let date1Value = new Date(date1.val());
    let date2Value = new Date(date2.val());

    if (account_number.val() == '') {
      response.html(
        `<div class="alert alert-danger">Select an account!</div>`
      );
    } else {

      // Check if date1 is after date2
      if (date1Value > date2Value) {
        response.html(
          `<div class="alert alert-danger">Date 1 should not be later than Date 2!</div>`
        );
      } else {
        response.html(
          ``
        );
        $('#table_1 tbody').html('');


        $.ajax({
          url: './fetch_data_1.php', // Replace with your server-side script
          method: 'POST',
          data: {
            date_1: date1.val(),
            date_2: date2.val(),
            account: account_number.val(),
          },
          success: function (response) {
            console.log(response);

            if (response.status == 'success') {
              let search_1 = response.data;
              search_1.forEach(entry => {
                $('#table_1 tbody').append(`<tr>
                  <td>${entry.id_registro}<input type="hidden" value="${entry.id_registro}" name="id_registro[]"></td>
                  <td>${entry.id_transaccion}<input type="hidden" value="${entry.id_transaccion}" name="id_transaccion[]"></td>
                  <td>${entry.monto}<input type="hidden" value="${entry.monto}" name="monto[]"></td>
                  <td>${entry.fecha}<input type="hidden" value="${entry.fecha}" name="fecha[]"></td>
                  <td>${entry.status}<input type="hidden" value="${entry.status}" name="status[]"></td>
                </tr>`);
              });
            }
          },
          error: function () {
            response.html(
              `<div class="alert alert-danger">An error occurred while fetching data.</div>`
            );
          },
        });
      }
    }
  } else {
    response.html(
      `<div class="alert alert-danger">Please select both dates!</div>`
    );
  }
});

$('#search_2').on('click', function () {
  let date1 = $('#date_1');
  let date2 = $('#date_2');
  let account_number = $('#account_number');
  let response = $('#response'); // Assuming you have a div with ID 'response' to display messages

  // Clear the response initially
  response.html('');

  if (date1.val() && date2.val()) {
    // Convert the dates to a comparable format
    let date1Value = new Date(date1.val());
    let date2Value = new Date(date2.val());

    if (account_number.val() == '') {
      response.html(
        `<div class="alert alert-danger">Select an account!</div>`
      );
    } else {

      // Check if date1 is after date2
      if (date1Value > date2Value) {
        response.html(
          `<div class="alert alert-danger">Date 1 should not be later than Date 2!</div>`
        );
      } else {
        response.html(
          ``
        );
        $('#table_2 tbody').html('');


        $.ajax({
          url: './fetch_data_2.php', // Replace with your server-side script
          method: 'POST',
          data: {
            date_1: date1.val(),
            date_2: date2.val(),
            account: account_number.val(),
          },
          success: function (response) {
            console.log(response);

            if (response.status == 'success') {
              let search_1 = response.data;
              search_1.forEach(entry => {
                $('#table_2 tbody').append(`<tr>
                  <td>${entry.Referencia_28c}<input type="hidden" name="Referencia_28c[]" value="${entry.Referencia_28c}"></td>
                  <td>${entry.referencia_61}<input type="hidden" name="referencia_61[]" value="${entry.referencia_61}"></td>
                  <td>${entry.tipo_trx_61}<input type="hidden" name="tipo_trx_61[]" value="${entry.tipo_trx_61}"></td>
                  <td>${entry.monto_trx_60F}<input type="hidden" name="monto_trx_60F[]" value="${entry.monto_trx_60F}"></td>
                  <td>${entry.fecha_mov_60F}<input type="hidden" name="fecha_mov_60F[]" value="${entry.fecha_mov_60F}"></td>
                  <td>${entry.status}<input type="hidden" name="status[]" value="${entry.status}"></td>
                </tr>`);
              });
            }
          },
          error: function () {
            response.html(
              `<div class="alert alert-danger">An error occurred while fetching data.</div>`
            );
          },
        });
      }
    }
  } else {
    response.html(
      `<div class="alert alert-danger">Please select both dates!</div>`
    );
  }
});

$('#btn_concillate').on('click', function () {
  $('#search_1,#search_2').prop('disabled', true);
  // Get rows from both tables
  const rowsTable1 = $('#table_1 tbody tr');
  const rowsTable2 = $('#table_2 tbody tr');

  // Clear previous matched classes
  rowsTable1.removeClass('row_matched');
  rowsTable2.removeClass('row_matched');

  // Loop through rows of Table 1
  rowsTable1.each(function () {
    const row1 = $(this);

    // Get values from Table 1 columns
    const col2Value = row1.find('td:nth-child(2)').text().trim(); // 2nd column
    const col3Value = row1.find('td:nth-child(3)').text().trim(); // 3rd column
    const col4Value = row1.find('td:nth-child(4)').text().trim(); // 4th column

    // Compare with rows of Table 2
    rowsTable2.each(function () {
      const row2 = $(this);

      // Get values from Table 2 columns
      const col3ValueTable2 = row2.find('td:nth-child(3)').text().trim(); // 3rd column
      const col4ValueTable2 = row2.find('td:nth-child(4)').text().trim(); // 4th column
      const col5ValueTable2 = row2.find('td:nth-child(5)').text().trim(); // 5th column

      // Log values for debugging
      console.log("Table 1: ", col2Value, col3Value, col4Value);
      console.log("Table 2: ", col3ValueTable2, col4ValueTable2, col5ValueTable2);

      // Check if all three conditions match
      if (
        col2Value === col3ValueTable2 &&
        col3Value === col4ValueTable2 &&
        col4Value === col5ValueTable2
      ) {
        // Add the .row_matched class to both rows
        row1.addClass('row_matched');
        row2.addClass('row_matched');
        return false; // Exit the loop as we've found a match
      }
    });
  });
});

$('#btn_save').on('click', function () {
  $('#btn_save,#btn_concillate').prop('disabled', true);
  const matchedRowsTable1 = $('#table_1 .row_matched'); // Select matched rows from Table 1
  const matchedRowsTable2 = $('#table_2 .row_matched'); // Select matched rows from Table 2

  let dataTable1 = []; // Array to store data from Table 1
  let dataTable2 = []; // Array to store data from Table 2
  const progressBar = $('.progress-bar'); // Progress bar element
  const responseDiv = $('#response'); // Response div for messages

  $('.progress').show();
  // Reset progress bar and response div
  progressBar.css('width', '0%').attr('aria-valuenow', 0);
  responseDiv.html('');

  // Collect data from matched rows of Table 1
  matchedRowsTable1.each(function () {
    const row = $(this);
    const data = {
      id_registro: row.find('input[name="id_registro[]"]').val(),
      id_transaccion: row.find('input[name="id_transaccion[]"]').val(),
      monto: row.find('input[name="monto[]"]').val(),
      fecha: row.find('input[name="fecha[]"]').val(),
      status: row.find('input[name="status[]"]').val(),
    };
    dataTable1.push(data);
  });

  // Collect data from matched rows of Table 2
  matchedRowsTable2.each(function () {
    const row = $(this);
    const data = {
      Referencia_28c: row.find('input[name="Referencia_28c[]"]').val(),
      referencia_61: row.find('input[name="referencia_61[]"]').val(),
      tipo_trx_61: row.find('input[name="tipo_trx_61[]"]').val(),
      monto_trx_60F: row.find('input[name="monto_trx_60F[]"]').val(),
      fecha_mov_60F: row.find('input[name="fecha_mov_60F[]"]').val(),
      status: row.find('input[name="status[]"]').val(),
    };
    dataTable2.push(data);
  });

  // Check if there's any matched data to send
  if (dataTable1.length > 0 && dataTable2.length > 0) {
    // Simulate progress bar increment
    let progress = 0;

    const progressInterval = setInterval(() => {
      progress += 10;
      if (progress <= 90) {
        progressBar.css('width', `${progress}%`).attr('aria-valuenow', progress);
      } else {
        clearInterval(progressInterval);
      }
    }, 300);

    // Send data via AJAX to reconcille_transactions.php
    $.ajax({
      url: './reconcille_transactions.php',
      method: 'POST',
      data: {
        table1: dataTable1,
        table2: dataTable2,
      },
      success: function (response) {
        console.log(response);
        response = JSON.parse(response);

        setTimeout(function () {

          clearInterval(progressInterval);
          progressBar.css('width', '100%').attr('aria-valuenow', 100);
        }, 3000);

        
        setTimeout(function () {
          $('.progress').hide();
          if (response.status === 'success') {
            responseDiv.html(
              `<div class="alert alert-success">${response.message}</div>`
            );
          } else {
            responseDiv.html(
              `<div class="alert alert-danger">Reconciliation failed: ${response.message}</div>`
            );
          }
        }, 4000);

      },
      error: function (xhr, status, error) {
        clearInterval(progressInterval);
        progressBar.css('width', '100%').attr('aria-valuenow', 100);
        responseDiv.html(
          `<div class="alert alert-danger">An error occurred: ${error}</div>`
        );
      },
    });
  } else {
    responseDiv.html(
      `<div class="alert alert-warning">No matched rows to reconcile!</div>`
    );
  }
});


$('#btn_clean').on('click', function () {
  $('#btn_save,#btn_concillate,#search_1,#search_2').prop('disabled', false);
  $('#table_1 tbody,#table_2 tbody').html('');
  $('#response').html('');
  $('#date_1,#date_2').val('');
});