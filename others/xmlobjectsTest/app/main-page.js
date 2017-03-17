"use strict";
var XmlObjects = require("nativescript-xmlobjects");
function navigatingTo(args) {
    var doc = XmlObjects.parse("<PurchaseOrder PurchaseOrderNumber=\"99503\" OrderDate=\"1999-10-20\">\n  <Address Type=\"Shipping\">\n    <Name>Ellen Adams</Name>\n    <Street>123 Maple Street</Street>\n    <City>Mill Valley</City>\n    <State>CA</State>\n    <Zip>10999</Zip>\n    <Country>USA</Country>\n  </Address>\n  <Address Type=\"Billing\">\n    <Name>Tai Yee</Name>\n    <Street>8 Oak Avenue</Street>\n    <City>Old Town</City>\n    <State>PA</State>\n    <Zip>95819</Zip>\n    <Country>USA</Country>\n  </Address>\n  <DeliveryNotes>Please leave packages in shed by driveway.</DeliveryNotes>\n  <Items>\n    <Item PartNumber=\"872-AA\">\n      <ProductName>Lawnmower</ProductName>\n      <Quantity>1</Quantity>\n      <USPrice>148.95</USPrice>\n      <Comment>Confirm this is electric</Comment>\n    </Item>\n    <Item PartNumber=\"926-AA\">\n      <ProductName>Baby Monitor</ProductName>\n      <Quantity>2</Quantity>\n      <USPrice>39.98</USPrice>\n      <ShipDate>1999-05-21</ShipDate>\n    </Item>\n  </Items>\n</PurchaseOrder>");
    // XElement
    var rootElement = doc.root;
    // XElement[]
    var allChildElements = rootElement.elements();
    var addressElements = rootElement.elements('Address');
    for (var i = 0; i < addressElements.length; i++) {
        var ae = addressElements[i];
        // XAttribute
        var typeAttribute = ae.attribute('Type');
        console.log('Type attribute: ' + typeAttribute.value);
    }
    // XNode[]
    var allNodes = rootElement.nodes();
    for (var i = 0; i < allNodes.length; i++) {
        var n = allNodes[i];
        if (n instanceof XmlObjects.XElement) {
            // XAttribute[]
            var allAttributes = n.attributes(); // the attributes
            console.log("I am an element with attributes: " + n.value);
        }
        else if (n instanceof XmlObjects.XComment) {
            console.log("I am a comment: " + n.value);
        }
        else if (n instanceof XmlObjects.XText) {
            console.log("I am a text." + n.value);
        }
        else if (n instanceof XmlObjects.XCData) {
            console.log("I am a CDATA: " + n.value);
        }
    }
    // create XML string
    var xmlStr = rootElement.toString();
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxvREFBdUQ7QUFFdkQsc0JBQTZCLElBQWU7SUFDeEMsSUFBSSxHQUFHLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxvL0JBZ0NkLENBQUMsQ0FBQztJQUVmLFdBQVc7SUFDWCxJQUFJLFdBQVcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBRTNCLGFBQWE7SUFDYixJQUFJLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUU5QyxJQUFJLGVBQWUsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQzlDLElBQUksRUFBRSxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU1QixhQUFhO1FBQ2IsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsVUFBVTtJQUNWLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNuQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ25DLGVBQWU7WUFDZixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBRSxpQkFBaUI7WUFFdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVDLENBQUM7SUFDTCxDQUFDO0lBRUQsb0JBQW9CO0lBQ3BCLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN4QyxDQUFDO0FBMUVELG9DQTBFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XG5cbmltcG9ydCBYbWxPYmplY3RzID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXhtbG9iamVjdHMnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5hdmlnYXRpbmdUbyhhcmdzOiBFdmVudERhdGEpIHtcbiAgICB2YXIgZG9jID0gWG1sT2JqZWN0cy5wYXJzZShgPFB1cmNoYXNlT3JkZXIgUHVyY2hhc2VPcmRlck51bWJlcj1cIjk5NTAzXCIgT3JkZXJEYXRlPVwiMTk5OS0xMC0yMFwiPlxuICA8QWRkcmVzcyBUeXBlPVwiU2hpcHBpbmdcIj5cbiAgICA8TmFtZT5FbGxlbiBBZGFtczwvTmFtZT5cbiAgICA8U3RyZWV0PjEyMyBNYXBsZSBTdHJlZXQ8L1N0cmVldD5cbiAgICA8Q2l0eT5NaWxsIFZhbGxleTwvQ2l0eT5cbiAgICA8U3RhdGU+Q0E8L1N0YXRlPlxuICAgIDxaaXA+MTA5OTk8L1ppcD5cbiAgICA8Q291bnRyeT5VU0E8L0NvdW50cnk+XG4gIDwvQWRkcmVzcz5cbiAgPEFkZHJlc3MgVHlwZT1cIkJpbGxpbmdcIj5cbiAgICA8TmFtZT5UYWkgWWVlPC9OYW1lPlxuICAgIDxTdHJlZXQ+OCBPYWsgQXZlbnVlPC9TdHJlZXQ+XG4gICAgPENpdHk+T2xkIFRvd248L0NpdHk+XG4gICAgPFN0YXRlPlBBPC9TdGF0ZT5cbiAgICA8WmlwPjk1ODE5PC9aaXA+XG4gICAgPENvdW50cnk+VVNBPC9Db3VudHJ5PlxuICA8L0FkZHJlc3M+XG4gIDxEZWxpdmVyeU5vdGVzPlBsZWFzZSBsZWF2ZSBwYWNrYWdlcyBpbiBzaGVkIGJ5IGRyaXZld2F5LjwvRGVsaXZlcnlOb3Rlcz5cbiAgPEl0ZW1zPlxuICAgIDxJdGVtIFBhcnROdW1iZXI9XCI4NzItQUFcIj5cbiAgICAgIDxQcm9kdWN0TmFtZT5MYXdubW93ZXI8L1Byb2R1Y3ROYW1lPlxuICAgICAgPFF1YW50aXR5PjE8L1F1YW50aXR5PlxuICAgICAgPFVTUHJpY2U+MTQ4Ljk1PC9VU1ByaWNlPlxuICAgICAgPENvbW1lbnQ+Q29uZmlybSB0aGlzIGlzIGVsZWN0cmljPC9Db21tZW50PlxuICAgIDwvSXRlbT5cbiAgICA8SXRlbSBQYXJ0TnVtYmVyPVwiOTI2LUFBXCI+XG4gICAgICA8UHJvZHVjdE5hbWU+QmFieSBNb25pdG9yPC9Qcm9kdWN0TmFtZT5cbiAgICAgIDxRdWFudGl0eT4yPC9RdWFudGl0eT5cbiAgICAgIDxVU1ByaWNlPjM5Ljk4PC9VU1ByaWNlPlxuICAgICAgPFNoaXBEYXRlPjE5OTktMDUtMjE8L1NoaXBEYXRlPlxuICAgIDwvSXRlbT5cbiAgPC9JdGVtcz5cbjwvUHVyY2hhc2VPcmRlcj5gKTtcblxuICAgIC8vIFhFbGVtZW50XG4gICAgdmFyIHJvb3RFbGVtZW50ID0gZG9jLnJvb3Q7XG5cbiAgICAvLyBYRWxlbWVudFtdXG4gICAgdmFyIGFsbENoaWxkRWxlbWVudHMgPSByb290RWxlbWVudC5lbGVtZW50cygpO1xuXG4gICAgdmFyIGFkZHJlc3NFbGVtZW50cyA9IHJvb3RFbGVtZW50LmVsZW1lbnRzKCdBZGRyZXNzJyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZGRyZXNzRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGFlID0gYWRkcmVzc0VsZW1lbnRzW2ldO1xuXG4gICAgICAgIC8vIFhBdHRyaWJ1dGVcbiAgICAgICAgdmFyIHR5cGVBdHRyaWJ1dGUgPSBhZS5hdHRyaWJ1dGUoJ1R5cGUnKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1R5cGUgYXR0cmlidXRlOiAnICsgdHlwZUF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgfVxuXG4gICAgLy8gWE5vZGVbXVxuICAgIHZhciBhbGxOb2RlcyA9IHJvb3RFbGVtZW50Lm5vZGVzKCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGxOb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbiA9IGFsbE5vZGVzW2ldO1xuXG4gICAgICAgIGlmIChuIGluc3RhbmNlb2YgWG1sT2JqZWN0cy5YRWxlbWVudCkge1xuICAgICAgICAgICAgLy8gWEF0dHJpYnV0ZVtdXG4gICAgICAgICAgICB2YXIgYWxsQXR0cmlidXRlcyA9IG4uYXR0cmlidXRlcygpOyAgLy8gdGhlIGF0dHJpYnV0ZXNcblxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJJIGFtIGFuIGVsZW1lbnQgd2l0aCBhdHRyaWJ1dGVzOiBcIiArIG4udmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG4gaW5zdGFuY2VvZiBYbWxPYmplY3RzLlhDb21tZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkkgYW0gYSBjb21tZW50OiBcIiArIG4udmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG4gaW5zdGFuY2VvZiBYbWxPYmplY3RzLlhUZXh0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkkgYW0gYSB0ZXh0LlwiICsgbi52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobiBpbnN0YW5jZW9mIFhtbE9iamVjdHMuWENEYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkkgYW0gYSBDREFUQTogXCIgKyBuLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBYTUwgc3RyaW5nXG4gICAgdmFyIHhtbFN0ciA9IHJvb3RFbGVtZW50LnRvU3RyaW5nKCk7XG59XG5cblxuIl19