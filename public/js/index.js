  $('#selectTable').change(function() {
    if ($(this).val() == 'roope' || $(this).val() == 'laura') {
      $('#formGroup').css('display', 'initial');
    } else {
      $('#formGroup').css('display', 'none');
    }
  });

  $('#updateTable').change(function() {
    if ($(this).val() == 'lauraUpdate') {
      $('#deleteLabel').css('display', 'initial');
      $('#deleteL').css('display', 'initial');
      $('#deleteR').css('display', 'none');
    } else if ($(this).val() == 'roopeUpdate') {
      $('#deleteLabel').css('display', 'initial');
      $('#deleteL').css('display', 'none');
      $('#deleteR').css('display', 'initial');
    } else {
      $('#deleteLabel').css('display', 'none');
      $('#deleteL').css('display', 'none');
      $('#deleteR').css('display', 'none');
    }
  });

  $('#releasedGame').change(function() {
    var gameNameLength = $('#releasedGame').val().length;

    if (gameNameLength > 0) {
      $('#reviewFields').css('display', 'initial');
    } else {
      $('#reviewFields').css('display', 'none');
    }
  });
