$('#selectTable').change(function() {
    if ($(this).val() == 'roope' || $(this).val() == 'laura') {
      $('#formGroup').css('display', 'initial');
    } else {
      $('#formGroup').css('display', 'none');
    }
  });

  $('#deleteTable').change(function() {
      if ($(this).val() == 'lauraDelete') {
        $('#deleteLabel').css('display', 'initial');
        $('#deleteL').css('display', 'initial');
        $('#deleteR').css('display', 'none');
      } else if ($(this).val() == 'roopeDelete') {
        $('#deleteLabel').css('display', 'initial');
        $('#deleteL').css('display', 'none');
        $('#deleteR').css('display', 'initial');
      } else {
        $('#deleteLabel').css('display', 'none');
        $('#deleteL').css('display', 'none');
        $('#deleteR').css('display', 'none');
      }
    });

    // $('#deleteUser').change(function() {
    //     if ($(this).val() == 'laura') {
    //       $('#deleteLaura').css('display', 'initial');
    //       $('#deleteRoope').css('display', 'none');
    //     } else if ($(this).val() == 'roope') {
    //       $('#deleteRoope').css('display', 'initial');
    //       $('#addLaura').css('display', 'none');
    //     } else {
    //       $('#deleteLaura').css('display', 'none');
    //       $('#deleteRoope').css('display', 'none');
    //     }
    //   });
