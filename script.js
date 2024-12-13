//1.1
//tener andando http-server .
//y luego usar node script.js
async function obtenerDatos()
{
    console.log("obteniendo datos");
    try
    {
        const response = await fetch("http://localhost:8080/datos-hospital.json");
        const datos = await response.json();
        console.log(datos);
        return datos;
    }
    catch (error)
    {
        console.error("Error al obtener datos: ", error);
    }
}

console.log("PARTE 1")
obtenerDatos()
.then((datos) => {
    const doctores = datos.doctores;
    const servicios = datos.servicios;

    //1.2
    //Clonar
    const doctorClonado = doctores[0];
    console.log(doctorClonado);
    //Fusionar
    const doctorYServicio={...doctores[0],...servicios[0]};
    console.log(doctorYServicio);
    //Recorrido
    doctores.forEach(doctor => {
        console.log(`${doctor.nombre} - ${doctor.especialidad} - ${doctor.experiencia}`);
    });

    console.log("PARTE 2")
    //2 busqueda
    const buscar = (especialidad) =>
        doctores.filter(doctor => doctor.especialidad === especialidad);
    console.log(buscar("Cardiología"));

    //2 experiencia
    doctores.sort((a,b) => b.experiencia - a.experiencia);
    console.log(doctores);

    //2 pila para citas
    var citas = [];
    citas.push({paciente:"Pablo",doctor:"Ana Lopez",hora:"10:00"});
    console.log(citas.pop());
    citas.push({paciente:"Pablo",doctor:"Ana Lopez",hora:"10:00"});

    //2 cola para pacientes
    const pacientes = [];
    pacientes.push("Paciente Foo");
    pacientes.push("Paciente Bar");
    console.log(pacientes.shift());

    console.log("PARTE 3")
    //3 funcional
    const calcularCosto = precio => cantidad => precio*cantidad;
    console.log(calcularCosto(50000)(3));

    //3 composicion de funciones
    const aplicarDescuento = costo => descuento => costo - (costo * descuento);
    const calcularCostoConDescuento = aplicarDescuento(150000)(0.1);
    console.log(calcularCostoConDescuento);

    //3 recursion
    const calcularHoras = (horas, index = 0) =>
            index === horas.length ? 0 : horas[index] + calcularHoras(horas, index + 1);
    console.log(calcularHoras([2,3,4]));

    console.log("PARTE 4");
    //4 OOP
    class Doctor
    {
        constructor(nombre, especialidad, experiencia) {
            this.nombre = nombre;
            this.especialidad = especialidad;
            this._experiencia = experiencia;
        }

        get experiencia()
        {
            return this._experiencia;
        }

        set experiencia(valor){
            if (valor < 0) throw new Error("Experiencia debe ser 0 o positiva");
            this._experiencia = valor;
        }

        mostrarInformacion()
        {
            return `Doctor ${this.nombre}, Especialidad: ${this.especialidad}`;
        }
    }

    class Cirujano extends Doctor {
        constructor(nombre, especialidad, experiencia, operaciones)
        {
            super(nombre, especialidad, experiencia);
            this.operaciones = operaciones;
        }

        mostrarInformacion()
        {
            return `${super.mostrarInformacion()}, Operaciones: ${this.operaciones}`;
        }
    }

    console.log("PARTE 5");
    //5 Programación asíncrona y eventos
    //registrar citas
    async function registrarCita(cita)
    {
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                citas.push(cita);
                resolve("Cita registrada con éxito");
            }, 1000);
        });
    }
    registrarCita({paciente:"Pedro",doctor:"Ana Lopez",hora:"11:00"}).
    then(console.log);

    //capturar eventos
    document.getElementById("form-cita").addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("Cita confirmada.");
    });
})