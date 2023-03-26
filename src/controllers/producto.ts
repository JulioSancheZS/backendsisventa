import { Request, Response } from 'express'
import Producto from '../models/producto';
import Categoria from '../models/categoria';

export const getProductos = async (req: Request, res: Response) => {
    try {
      const productos = await Producto.findAll({
        include: [{
          model: Categoria,
          attributes: ['nombre']
        }],
        attributes: ['idProducto', 'nombre', 'descripcion', 'precio', 'existencia', 'stockMinimo', 'stockMaximo', 'activo', 'fechaRegistro']
      });
      res.json(productos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Ocurrió un error al obtener los productos' });
    }
  }
  
  export const getProductoPorId = async (red: Request, response: Response) => {

    //destructurar 
  const { id } = red.params;
   
  const producto = await Producto.findByPk(id)

  if(producto){
    response.json(producto);
  }else{
    response.status(404).json({
        msg: `No existe el producto con el ID ${id}`
    })
  }
   
}

//Agregar de producto
export const postProducto = async(res: Request, response: Response) => {

    //destructurar 
   //destructurar
   const { idCategoria,
    nombre,
    descripcion,
    precio,
    existencia,
    stockMinimo,
    stockMaximo,
    activo
} = res.body;

   //Agregar se hace con el create y le pasamos el body
   try {
    const currentDate = new Date(); //Fecha actual del servidor

     await Producto.create({
      idCategoria: idCategoria,
      nombre: nombre,
      descripcion: descripcion,
      precio:precio,
      existencia: existencia,
      fechaRegistro: currentDate,
      stockMaximo: stockMaximo,
      stockMinimo: stockMinimo,
      activo: activo
     });
     //Enviamos mensaje
     response.json({
       msg: 'El Producto fue agregada con exito',
     })
   } catch (error) {
     console.log(error);
     //Enviamos mensaje
     response.json({
       msg: 'Upps, ocurrio un error',
     })
   }
 }

 //Desactivar/Eliminar de producto por id
export const deleteProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id)
    try {
      // Buscamos la producto por su ID
      const producto = await Producto.findByPk(id);
  
      if (!producto) {
        return res.status(404).json({
          msg: `No existe la categoria con el Id ${id}`
        });
      }
  
      // Actualizamos el campo activo a false
      await producto.update({ activo: false });
  
      res.json({
        msg: `El Producto fue desactivada con exito`,
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Upps, ocurrio un error al desactivar el Producto',
      });
    }
  };


  //Editamos el producto por ID
export const updateProducto = async (res: Request, response: Response) => {

    //destructurar 
    const { body } = res;
    const { id } = res.params; //obtenemos el id
    const producto = await Producto.findByPk(id);
  
    try {
      if (producto) {
        await producto.update(body)
        response.json({
          msg: 'El Producto fue actualizado con exito',
        })
      } else {
    
        response.status(404).json({
          msg: `No existe el Producto con el Id ${id}`
        })
    
      }
    } catch (error) {
      console.log(error);
      //Enviamos mensaje
      response.json({
        msg: 'Upps, ocurrio un error al actualizar',
      })
    }
  }
