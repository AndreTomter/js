var semdato = new Date();
	var dd = String(semdato.getDate()).padStart(2, '0');
	var mm = String(semdato.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = semdato.getFullYear();

		if (dd >= 01 	&&	mm	== 	12) 	{ semester = yyyy+1	+	"v";}
		if (			mm	< 	06) 	{ semester = yyyy	+	"v";}
		if (dd <  15 	&& 	mm 	== 	06) 	{ semester = yyyy	+	"v";}
		if (dd >= 15 	&&	mm 	== 	06) 	{ semester = yyyy	+	"h";}
		if (			mm	> 	06 === 12) 	{ semester = yyyy	+	"h";}
		
		if (dd >= 01 	&&	mm	== 	12) 	{ semestertekst = "våren " + (yyyy+1)	;}
		if (			mm	< 	06) 	{ semestertekst = "våren " + yyyy	;}
		if (dd <  15 	&& 	mm 	== 	06) 	{ semestertekst = "våren " + yyyy	;}
		if (dd >= 15 	&&	mm 	== 	06) 	{ semestertekst = "høsten " + yyyy	;}
		if (			mm	> 	06 === 12) 	{ semestertekst = "høsten " + yyyy	;}
	
	const api_url = "https://fs.data.uib.no/KEYuxumaqu6u/json/littl_emne/"	+	semester;
	const fakultet3 = ['15']
	async function getapi3(api_url)	{
    const response = await fetch(api_url);
    const data = await response.json();
    const emne = data.emne.filter( i => fakultet3.includes( i.faknr_reglement ) );
    const sortert = emne.sort( function( a, b )
            {
                                    a = a.instituttnr_reglement.concat(a.emnekode.toLowerCase());
                                    b = b.instituttnr_reglement.concat(b.emnekode.toLowerCase());
                                    return a < b ? -1 : a > b ? 1 : 0;
                            });
    var emneKode = [];
          sortert.forEach(function (sortert) {
              emneKode.push(sortert.emnekode)});
    var emnekoder = emneKode.map(i => '.' + i);

              const l = emnekoder
              var x = document.querySelectorAll(l);
              var i;
            for (i = 0; i < x.length; i++) {
                x[i].style.backgroundColor = "red";
            }
//document.getElementById("demo2").innerHTML = text;
        }
getapi3(api_url);
