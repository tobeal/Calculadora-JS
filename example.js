// Ejercicio de prueba, es decir, no es la fase final, se puede mejorar.
// ESPERO QUE TE SIRVA 
var valor1 = 0;
var numeros;
var operadores = [];
var resultado = 0;
var ultimaPrioridad = 0;

const cambiarValor = (valor)=>{
	// cambiar el valor del texto que aparece en la calculadora y si es un operador añadirlo al array de operadores
	const span = document.getElementById('textoPantalla');
	span.classList.remove('blink')
	if (span.textContent == '_'){
		span.textContent=valor;
	}else{
		span.textContent+=valor;
		if (['-','+','÷','x'].includes(valor)){
			operadores.push({'operador':valor, 'prioridad':0, 'valor':-1});
		}
	}
}

const calcularPrioridades = ()=>{
	// obtener las prioridades de los operadores de izq a dcha, para saber el orden de las operaciones.
	let prioridad = 1;
	// Prioridades de multiplicacion y division
	operadores.forEach((element) =>{ 
		if(element['operador'] == 'x' || element['operador'] == '÷'){
			element['prioridad'] = prioridad;
			prioridad++;
		}
	}
	);
	// Prioridades de suma y resta
	operadores.forEach((element) =>{ 
		if(element['operador'] == '+' || element['operador'] == '-'){
			element['prioridad'] = prioridad;
			prioridad++;
		}
	}
	);
	ultimaPrioridad = prioridad - 1;
	
}
const cambiarValorTiktok = (valor)=>{
	// funcion del boton tiktok para poner texto
	const span = document.getElementById('textoPantalla');
	const spanResultado = document.getElementById('textoResultado');
	span.classList.remove('blink')
	if (span.textContent == '_'){
		span.textContent=valor+' 😁';
	}
	spanResultado.textContent='';

}

const cambiarResultado = ()=>{
	// Calcular la operacion numerica, se basa en las prioridades de los operadores
	// se realizan una serie de if para comprobar a que operador le toca del array operadores 
	// y si debe obtener el valor del operador adyacente o de los números correspondientes
	const spanResultado = document.getElementById('textoResultado');
	const span = document.getElementById('textoPantalla');

	obtenerNumeros();
	calcularPrioridades();

	prioridad = 1;
	i = 0;

	if(comprobarTextoCorrecto()){
		while(prioridad!=(ultimaPrioridad+1)){
			if(operadores[i]['prioridad'] == prioridad){
				if((operadores[i]['operador'] == 'x' || operadores[i]['operador'] == '÷')){
					// Se contemplan las operaciones de multiplicacion y division
					if(i==0 || (operadores[i-1]['prioridad']) > (operadores[i]['prioridad'])){
						operadores[i]['valor'] = operacion(parseFloat(numeros[i]),parseFloat(numeros[i+1]), operadores[i]['operador']);
					}else if(operadores[i-1]['prioridad'] == (prioridad-1)){
						operadores[i-1]['valor'] = operadores[i]['valor'] = operacion(operadores[i-1]['valor'],parseFloat(numeros[i+1]), operadores[i]['operador']);
					}
				}else if(i!=(operadores.length - 1)){
						// se contemplan las operaciones de suma y resta que no sean el ultimo operador

						if(i==0){
							operadores[i]['valor'] = operacion(parseFloat(numeros[i]),operadores[i+1]['valor'], operadores[i]['operador'])
						}
						else if((operadores[i+1]['prioridad']) > (operadores[i]['prioridad'])){
							operadores[i]['valor'] = operacion(operadores[i-1]['valor'],parseFloat(numeros[i+1]), operadores[i]['operador']);
						}
						else{
							operadores[i]['valor'] = operacion(operadores[i-1]['valor'],operadores[i+1]['valor'], operadores[i]['operador']);
						}

				}else{
					// se contemplan las operaciones de suma y resta que sean el ultimo operador
						operadores[i]['valor'] = operacion(operadores[i-1]['valor'],parseFloat(numeros[i+1]), operadores[i]['operador']);
				}
				
				if(prioridad == ultimaPrioridad)
					spanResultado.textContent = operadores[i]['valor'].toFixed(2);
				prioridad++;
			}
			if(i == (operadores.length - 1))
				i=0;
			else
				i++;
		}
		
	}else{
		span.textContent = 'Syntax ERROR';	
		spanResultado.textContent = '';	
	}

}

const obtenerNumeros = ()=>{
	// funcion para obetener un array de numero a partir de la operacion insertada por el usuario
	const span = document.getElementById('textoPantalla');
	numeros = span.textContent.split('+').join('-').split('-').join('x').split('x').join('÷').split('÷');
	numeros = numeros.filter((a) => a);
}
const comprobarTextoCorrecto = ()=>{
	// Comprobar la sintaxis de la operacion(que no haya mas operadores que numeros)
	if (numeros.length <= operadores.length){
		return false;
	}else{
		return true;
	}
}

const operacion=(num1, num2, operacion)=>{
	// Función para calcular las operaciones del num1 y num2 segun el valor del operador
	console.log('num1: '+num1+' num2: '+num2+' operacion: '+operacion)
	if(operacion=='+'){
		return (parseFloat(num1) + parseFloat(num2));
	}
	else if(operacion=='-'){
		return (parseFloat(num1) - parseFloat(num2));
	}
	else if(operacion=='x'){
		return (parseFloat(num1) * parseFloat(num2));
	}
	else if(operacion=='÷'){
		return  (parseFloat(num1) / parseFloat(num2));
	}

}

const borrarValores =()=>{
	// Funcion para limpiar los valores de la calculadora y las variables asociadas
	const span = document.getElementById('textoPantalla');
	const spanResultados = document.getElementById('textoResultado');
	span.classList.add('blink')
	span.textContent='_';
	spanResultados.textContent='0.';
	resultado=0;
	numeros=operadores=[];


}