import express, { Application, Request, Response } from 'express'
import routeCategoria from '../routes/categoria'
import routeProducto from '../routes/producto'
import db from '../db/dbconexion' //Conexion

class Server{
    private app: Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midleweres();
        this.routes();
        this.dbConnect();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`)
        })
    }

    //Rutas del api
    routes(){
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'API working'
            })
        })
        this.app.use('/api/categorias', routeCategoria);
        this.app.use('/api/productos', routeProducto);
    }

      //Funciones que se ejecutan despues de algo
      midleweres() {
        //parseaomos el body
        this.app.use(express.json());
        //Cors
        //this.app.use(cors());
        
    }

    //Conexion a db
    async dbConnect() {
        try {
            //authenticate devuelve una promesa
            await db.authenticate();
            console.log("Base de datos conectada");
        } catch (error) {
            console.log(error);
            console.log("Error al conectarse a la base de datos");
        }

    }
}

export default Server

