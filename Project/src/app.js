var layerA = new Layer({
    width:              200,
    height:             200,
    backgroundColor:    '#41D2D0',
    borderRadius:       '3px'
});

var layerB = new Layer({
    width:              100,
    height:             100,
    backgroundColor:    '#FC4C58',
    borderRadius:       '3px',
    superLayer:         layerA
});

layerA.center();
layerB.center();
