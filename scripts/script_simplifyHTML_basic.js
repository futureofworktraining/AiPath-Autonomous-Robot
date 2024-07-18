() => {
    // Function thta checks if the UI element is visable
    function isVisible(element) {
        const rect = element.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        const viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);
        const style = window.getComputedStyle(element);
    
        const isVisibleInViewport = !(rect.bottom < 0 || rect.top > viewHeight || rect.right < 0 || rect.left > viewWidth);
        const isStyleVisible = style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    
        return isVisibleInViewport && isStyleVisible;
    }

    // Function to remove specific tags and their content
    function removeTags(doc, tagName) {
        var tags = doc.getElementsByTagName(tagName);
        for (var i = tags.length - 1; i >= 0; i--) {
            tags[i].parentNode.removeChild(tags[i]);
        }
    }

    // Function to remove all attributes except href and tag, and only keep style if it's "display: none;"
    function removeAllAttributesExceptHrefAndTag(doc) {
        var allElements = doc.getElementsByTagName('*');
        for (var i = 0; i < allElements.length; i++) {
            var element = allElements[i];
            var attributes = Array.from(element.attributes);
            var keepStyle = element.style.cssText === "display: none;";
            for (var j = 0; j < attributes.length; j++) {
                var attrName = attributes[j].name;
                if (!['href', 'tag', 'aid', 'placeholder', 'name', 'id', 'role', 'type', 'aria-label'].includes(attrName)) {
                    if (attrName === 'style' && keepStyle) {
                        continue;
                    }
                    element.removeAttribute(attrName);
                }
            }
        }
    }

    // Function to assign unique IDs to each element, excluding specific tags
    function assignUniqueIDs(doc) {
        var allElements = doc.getElementsByTagName('*');
        var aidCounter = 0;
        var excludeTags = ['STYLE', 'SCRIPT', 'PATH', 'SVG', 'NOSCRIPT'];
        for (var i = 0; i < allElements.length; i++) {
            if (!excludeTags.includes(allElements[i].tagName)) {
                allElements[i].setAttribute('aid', aidCounter);
                aidCounter++;
            }
        }
    }

    // Function to remove HTML comment nodes
    function removeHTMLComments(node) {
        var childNodes = node.childNodes;
        for (var i = childNodes.length - 1; i >= 0; i--) {
            var child = childNodes[i];
            if (child.nodeType === Node.COMMENT_NODE) {
                child.parentNode.removeChild(child);
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                removeHTMLComments(child);
            }
        }
    }

    // Function to remove UI elements without text inside, except for specific tags
    function removeEmptyElements(doc) {
        var allElements = doc.getElementsByTagName('*');
        var exemptTags = ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'];
        for (var i = allElements.length - 1; i >= 0; i--) {
            if (!exemptTags.includes(allElements[i].tagName) && allElements[i].innerText.trim() === '' && allElements[i].children.length === 0) {
                allElements[i].parentNode.removeChild(allElements[i]);
            }
        }
    }

    // Function to remove non-visible elements
    function removeNonVisibleElements(doc) {
        var allElements = doc.getElementsByTagName('*');
        for (var i = allElements.length - 1; i >= 0; i--) {
            if (!isVisible(allElements[i])) {
                console.log(allElements[i])
                allElements[i].parentNode.removeChild(allElements[i]);
            }
        }
    }

    // Function to process the HTML page
    function processHTML() {
        assignUniqueIDs(document);
        
        // Clone the body of the document
        var clonedBody = document.body.cloneNode(true);
        
        removeTags(clonedBody, 'style');
        removeTags(clonedBody, 'script');
        removeTags(clonedBody, 'path');
        removeTags(clonedBody, 'svg');
        removeTags(clonedBody, 'noscript');
        removeAllAttributesExceptHrefAndTag(clonedBody);
        removeHTMLComments(clonedBody);
        removeEmptyElements(clonedBody);
        removeNonVisibleElements(clonedBody);
        
        // Returning the innerHTML of the cloned body
        return clonedBody.innerHTML;
    }

    // Run the function and store the result
    var processedHTML = processHTML();
    // Output the processed HTML
    console.log(processedHTML);
    return processedHTML;
}


// REMOVE AFTER TESTING

// (() => {
//     // Checks if the UI element is visable
//     function isVisible(element) {
//         const rect = element.getBoundingClientRect();
//         const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
//         const viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);
//         const style = window.getComputedStyle(element);
    
//         const isVisibleInViewport = !(rect.bottom < 0 || rect.top > viewHeight || rect.right < 0 || rect.left > viewWidth);
//         const isStyleVisible = style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    
//         return isVisibleInViewport && isStyleVisible && element.offsetParent !== null;
//     }

//     // Function to remove specific tags and their content
//     function removeTags(doc, tagName) {
//         var tags = doc.getElementsByTagName(tagName);
//         for (var i = tags.length - 1; i >= 0; i--) {
//             tags[i].parentNode.removeChild(tags[i]);
//         }
//     }

//     // Function to remove all attributes except href and tag, and only keep style if it's "display: none;"
//     function removeAllAttributesExceptHrefAndTag(doc) {
//         var allElements = doc.getElementsByTagName('*');
//         for (var i = 0; i < allElements.length; i++) {
//             var element = allElements[i];
//             var attributes = Array.from(element.attributes);
//             var keepStyle = element.style.cssText === "display: none;";
//             for (var j = 0; j < attributes.length; j++) {
//                 var attrName = attributes[j].name;
//                 if (!['href', 'tag', 'aid', 'placeholder', 'name', 'id', 'role', 'type', 'aria-label'].includes(attrName)) {
//                     if (attrName === 'style' && keepStyle) {
//                         continue;
//                     }
//                     element.removeAttribute(attrName);
//                 }
//             }
//         }
//     }

//     // Function to assign unique IDs to each element, excluding specific tags
//     function assignUniqueIDs(doc) {
//         var allElements = doc.getElementsByTagName('*');
//         var aidCounter = 0;
//         var excludeTags = ['STYLE', 'SCRIPT', 'PATH', 'SVG', 'NOSCRIPT'];
//         for (var i = 0; i < allElements.length; i++) {
//             if (!excludeTags.includes(allElements[i].tagName)) {
//                 allElements[i].setAttribute('aid', aidCounter);
//                 aidCounter++;
//             }
//         }
//     }

//     // Function to remove HTML comment nodes
//     function removeHTMLComments(node) {
//         var childNodes = node.childNodes;
//         for (var i = childNodes.length - 1; i >= 0; i--) {
//             var child = childNodes[i];
//             if (child.nodeType === Node.COMMENT_NODE) {
//                 child.parentNode.removeChild(child);
//             } else if (child.nodeType === Node.ELEMENT_NODE) {
//                 removeHTMLComments(child);
//             }
//         }
//     }

//     // Function to remove UI elements without text inside, except for specific tags
//     function removeEmptyElements(doc) {
//         var allElements = doc.getElementsByTagName('*');
//         var exemptTags = ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'];
//         for (var i = allElements.length - 1; i >= 0; i--) {
//             if (!exemptTags.includes(allElements[i].tagName) && allElements[i].innerText.trim() === '' && allElements[i].children.length === 0) {
//                 allElements[i].parentNode.removeChild(allElements[i]);
//             }
//         }
//     }

//     // Function to remove non-visible elements without child elements
//     function removeNonVisibleElements(doc) {
//         var allElements = doc.getElementsByTagName('*');
//         for (var i = allElements.length - 1; i >= 0; i--) {
//             if (!isVisible(allElements[i]) && allElements[i].children.length === 0) {
//                 allElements[i].parentNode.removeChild(allElements[i]);
//             }
//         }
//     }

//     // Function to process the HTML page
//     function processHTML() {
//         assignUniqueIDs(document);
        
//         // Clone the body of the document
//         var clonedBody = document.body.cloneNode(true);
        
//         removeTags(clonedBody, 'style');
//         removeTags(clonedBody, 'script');
//         removeTags(clonedBody, 'path');
//         removeTags(clonedBody, 'svg');
//         removeTags(clonedBody, 'noscript');
//         removeAllAttributesExceptHrefAndTag(clonedBody);
//         removeHTMLComments(clonedBody);
//         removeEmptyElements(clonedBody);
//         removeNonVisibleElements(clonedBody);
        
//         // Returning the innerHTML of the cloned body
//         return clonedBody.innerHTML;
//     }

//     // Run the function and store the result
//     var processedHTML = processHTML();
//     // Output the processed HTML
//     console.log(processedHTML);
//     return processedHTML;
// })()
