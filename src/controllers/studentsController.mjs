

export const studentsController = {

    
    getAll: async (req, res) => {
        //Simulando la fuente de datos
        const students = ["Uno", "Dos", "Tres", "Cuatro", "Cinco"]
        

        //Respuesta 
        res.json({data: {
                students:students,
            }
        });
    }
}