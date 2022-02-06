<script>
var conditions = jQuery('.condition').length;
if (conditions > 0) {
  console.log(conditions);
  for (var i=0; i< conditions; i++) {
    var num = i+1;
    hiddenElements(num);
  }
}

function hiddenElements(wrapper) {
  var el = jQuery('.hiddenwrapper'+wrapper);
  var classList = el.attr('class').split(/\s+/);
  var shown = [];

  for (var j=0; j< classList.length; j++) {

    if(classList[j].indexOf("show") >= 0) {
      shown.push(classList[j]);
    }
  }

  for (var k=0; k< shown.length; k++) {
    var x = shown[k];
    x = Number(x.replace('show',''));
    var trigger = jQuery('.hiddenwrapper'+wrapper+'.condition>tbody>tr>td>table>tbody>tr:nth-of-type('+x+')');
    trigger.addClass('trigger');
  }
}

function reactTo(hidden) {
  var wrapperElement = jQuery(hidden).closest('.condition').attr('class').split(/\s+/);
  var wrapperId = '';
  for (var i=0; i< wrapperElement.length; i++) {
      if(wrapperElement[i].indexOf("hiddenwrapper") >= 0) {
          wrapperId = wrapperElement[i];
      }
    }
    var isTrigger = jQuery(hidden).closest('tr').hasClass('trigger') ? true : false;
    if(isTrigger) {
      jQuery('.'+wrapperId+' .hidden').show();
    } else {
      jQuery('.'+wrapperId+' .hidden').hide();
    }
}

jQuery('.condition input').click(function() {reactTo(this);});

if (jQuery('.scale').length > 0) {
  jQuery('table.scale>tbody>tr>td>table>tbody>tr').addClass('scale-row');
  var hidden =  jQuery(".hidden").closest(".scale-row");
  hidden.addClass('clear-row');
}

</script>
