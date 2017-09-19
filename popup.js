(function() {
    $.widget("mobile.popup", {
        _create: function() { 
           var _self = this;
           _self._popup = $('<div class="custom_popup"></div>');
           _self._popupMask = $('<div class="custom_popup_mask"></div>');
           _self._popupContent = $('<div class="custom_popup_content"></div>');
           _self._addPopupMask();
           _self._popup.append(_self._popupContent);

            $('body').append(_self._popup);
        },
        _setOption: function (key, value) {
            var _self = this;

            if (key == "template") {
                _self._popupContent.html(value);
            }
            else if(key == "class"){
                _self._popup.addClass(value);
            }
        },
        _setOptions: function(options) {
            var _self = this;

            _self._super(options);
            _self._repositionPopup();
        },
        _addPopupMask: function () {
            var _self = this;
           
            $('body').append(_self._popupMask);
           
            _self._popupMask.height($(document).height());

            _self._popupMask.on('click', function () {
                _self._popup.remove();
                _self._popupMask.remove();
                _self._destroyPopup();
           });

        },
        _repositionPopup: function () {
            var _self = _self || this;
            
            var popupHeight = _self._popup.height();
            var topVal = (popupHeight < window.innerHeight ? 0 : (window.pageYOffset || document.documentElement.scrollTop));
            var screenMidVal = topVal + (window.innerHeight / 2);
            
            if(popupHeight >= window.innerHeight)
            {
                _self._popup.css("position","absolute");
            }
            _self._popup.css("top", (screenMidVal - (popupHeight ? popupHeight / 2 : 0)) +"px");

            $(window).unbind().bind('orientationchange', function () {
                setTimeout(function(){
                    _self._repositionPopup();
                }, 300); // Timeout To be Adjusted
            });
        },
        _destroyPopup: function () {
           $.Widget.prototype.destroy.call(this);
        }
    });
})();
