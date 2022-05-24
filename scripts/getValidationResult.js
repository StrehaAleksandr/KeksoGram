'use strict';

(function() {
    function validate(str) {
        var MAX_HASH_TAGS = 5;
        var MAX_HASH_TAGS_LENGTH = 20;

        var hashtagsArray = str.split(' ');

        var errorsMessages = {
            countHashTags: 'Должо быть не больше 5 хэш-тегов',
            noSharp: 'Хэш-тег начинается с <#>',
            onlySharp: 'Хэш-тег не может состоять только из <#>',
            hashTagLength: 'Длина хеш-тега не больше 20 символов, включая <#>',
            spaceBetweenHashTags: 'Хеш-теги должны разделяться пробелом',
            doubleHashTag: 'Нельзя повторять хеш-теги'
        };

        var errorsMessagesStatus = {
            countHashTags: false,
            noSharp: false,
            onlySharp: false,
            hashTagLength: false,
            spaceBetweenHashTags: false,
            doubleHashTag: false
        };

        var resultErrorMessage = [];
        
        errorsMessagesStatus.countHashTags = errorsMessagesStatus.countHashTags || hashtagsArray.length > MAX_HASH_TAGS;
        
        for (var i = 0; i < hashtagsArray.length; i++) {
            errorsMessagesStatus.noSharp = errorsMessagesStatus.noSharp || hashtagsArray[i].indexOf('#') !== 0 && hashtagsArray[i].length > 0;        
            errorsMessagesStatus.onlySharp = errorsMessagesStatus.onlySharp || hashtagsArray[i].length === 1;                
            errorsMessagesStatus.hashTagLength = errorsMessagesStatus.hashTagLength || hashtagsArray[i].length > MAX_HASH_TAGS_LENGTH;        
            errorsMessagesStatus.spaceBetweenHashTags = errorsMessagesStatus.spaceBetweenHashTags || hashtagsArray[i].lastIndexOf('#') > 0;
            
            for (var j = i + 1; j < hashtagsArray.length; j++) {
                errorsMessagesStatus.doubleHashTag = errorsMessagesStatus.doubleHashTag || hashtagsArray[j].toUpperCase() === hashtagsArray[i].toUpperCase();            
            }
        }

        for (var key in errorsMessagesStatus) {
            if (errorsMessagesStatus[key]) {
                resultErrorMessage.push(errorsMessages[key]);
            }
        }
        
        return resultErrorMessage;
    }

    function getValidationResult(string) {
        return validate(string);
    }

    window.getValidationResult = getValidationResult;
})();
