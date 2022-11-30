<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
   "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
<script>
async function getData() {
	
  var url11 			= await (await fetch('https://fs-pres.data.uib.no/KEYuxumaqu6u/sted/184.15.11/info.json')).json()
  var emne11 			= url11.emner_fag
  var newEmne11 		= emne11.map(v => ({...v, institutt: "Sosiologisk institutt"}))
  var data11 			= Promise.all(url11)
  
  var url12 			= await (await fetch('https://fs-pres.data.uib.no/KEYuxumaqu6u/sted/184.15.12/info.json')).json()
  var emne12 			= url12.emner_fag
  var newEmne12 		= emne12.map(v => ({...v, institutt: "Institutt for politikk og forvaltning"}))
  var data12 			= Promise.all(url12)
  
  var url13 			= await (await fetch('https://fs-pres.data.uib.no/KEYuxumaqu6u/sted/184.15.13/info.json')).json()
  var emne13 			= url13.emner_fag
  var newEmne13 		= emne13.map(v => ({...v, institutt: "Institutt for sammenliknende politikk"}))
  var data13 			= Promise.all(url13)
  
  var url15 			= await (await fetch('https://fs-pres.data.uib.no/KEYuxumaqu6u/sted/184.15.15/info.json')).json()
  var emne15 			= url15.emner_fag
  var newEmne15 		= emne15.map(v => ({...v, institutt: "Institutt for økonomi"}))
  var data15 			= Promise.all(url15)
  
  var url17 			= await (await fetch('https://fs-pres.data.uib.no/KEYuxumaqu6u/sted/184.15.17/info.json')).json()
  var emne17 			= url17.emner_fag
  var newEmne17 		= emne17.map(v => ({...v, institutt: "Institutt for informasjons- og medievitenskap"}))
  var data17 			= Promise.all(url17)
  
  var url34 			= await (await fetch('https://fs-pres.data.uib.no/KEYuxumaqu6u/sted/184.15.34/info.json')).json()
  var emne34 			= url34.emner_fag
  var newEmne34 		= emne34.map(v => ({...v, institutt: "Institutt for sosialantropologi"}))
  var data34 			= Promise.all(url34)
  
  
  var url41 			= await (await fetch('https://fs-pres.data.uib.no/KEYuxumaqu6u/sted/184.15.41/info.json')).json()
  var emne41 			= url41.emner_fag
  var newEmne41 		= emne41.map(v => ({...v, institutt: "Institutt for geografi"}))
  var data41 			= Promise.all(url41)


 	
  let emner 	=newEmne11.concat(newEmne12).concat(newEmne13).concat(newEmne15).concat(newEmne17).concat(newEmne34).concat(newEmne41)
   	
  return emner 
  
   
}

getData()
.then(emner => {
console.log(emner)
 
		let tab =
			`<thead stype="color: #FFFFFF"><tr data-port="stay" style="hight:20px">
				
        <th class="col1">Emnekode</th>
				<th class="col2">Navn</th>
				<th class="col3">SP</th>
        
			</tr></thead>`;
	
		// Loop to access all rows
		for (let r of emner) {
        	tab += `<tr data-syklus="${r.category}" data-institutt="${r.institutt}"> 
        <td ><a href="https://www.uib.no/utvekslingsavtale/${r.id}">${r.id}</a></td>  
				<td >${r.title_en}</td>   
   			<td >${r.studiepoeng}</td> 
        
			</tr>`;
					}
	
	// Setting innerHTML as tab variable
	document.getElementById("emner").innerHTML = tab;
  
  })

</script>
</head>
<body>
  <p>
    Henter emner fra sted.
  </p>
<table id="emner" class="emner"></table>
</body>

</html>
