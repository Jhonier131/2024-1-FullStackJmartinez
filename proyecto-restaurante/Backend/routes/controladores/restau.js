const {
    Console
} = require('console');
const fs = require('fs/promises');
const path = require('path');


const consultarUsuario = async (req, res) => {
    console.log(req.body);

    try {
        const usuarios = await fs.readFile(path.join(__dirname, '../../db/users.json'));
        const usuariosJson = JSON.parse(usuarios)
        const { username, password } = req.body;
        const user = usuariosJson.usuarios.find((usuario) => {return (usuario.username == username && usuario.password == password)});
        
        


        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        console.log(user);

        // Aquí puedes realizar acciones adicionales si las credenciales son válidas,
        // como generar un token de sesión, guardar información en una cookie, etc.

        // Por ejemplo, si quieres devolver los datos del usuario:
        res.json({status:200, payload: user });

    } catch (error) {
        console.error('Error al consultar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
// ---------------------------------------------------------------------------------------------------------------------------------------
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await fs.readFile(path.join(__dirname, '../../db/users.json'));
        const usuariosJson = JSON.parse(usuarios);
        res.json(usuariosJson);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const agregarUsuario = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const usuarios = await fs.readFile(path.join(__dirname, '../../db/users.json'));
        const usuariosJson = JSON.parse(usuarios);
        const id = usuariosJson.usuarios.length + 1;
        const nuevoUsuario = { username, password, role, id };

        usuariosJson.usuarios.push(nuevoUsuario);
        await fs.writeFile(path.join(__dirname, '../../db/users.json'), JSON.stringify(usuariosJson, null, 2));
        res.status(201).send(usuariosJson);
    } catch (error) {
        console.error('Error al agregar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const { username, password, role, id } = req.body; // Obtener los nuevos datos del usuario del cuerpo de la solicitud

        // Leer el archivo JSON que contiene los usuarios
        const usuarios = await fs.readFile(path.join(__dirname, '../../db/users.json'));
        const usuariosJson = JSON.parse(usuarios);

        // Buscar el índice del usuario que se va a actualizar
        const index = usuariosJson.usuarios.findIndex(usuario => usuario.id == id);

        // Si el usuario no se encuentra, devolver un error 404
        if (index === -1) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Actualizar los datos del usuario en el array
        usuariosJson.usuarios[index].username = username;
        usuariosJson.usuarios[index].password = password;
        usuariosJson.usuarios[index].role = role;

        // Escribir los datos actualizados en el archivo JSON
        await fs.writeFile(path.join(__dirname, '../../db/users.json'), JSON.stringify(usuariosJson, null, 2));

        // Devolver una respuesta exitosa con los datos actualizados del usuario
        res.status(200).json({ message: 'Usuario actualizado correctamente', usuario: usuariosJson.usuarios[index] });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        // Leer el contenido del archivo usuarios.json
        const usuarios = await fs.readFile(path.join(__dirname, '../../db/users.json'), 'utf-8');
        const usuariosJson = JSON.parse(usuarios);

        // Obtener la lista de usuarios
        const listaUsuarios = usuariosJson.usuarios;

        // Encontrar el índice del usuario a eliminar
        const index = listaUsuarios.findIndex(usuario => usuario.id === parseInt(id));
        if (index === -1) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Eliminar el usuario del array
        listaUsuarios.splice(index, 1);

        // Escribir los cambios de vuelta al archivo
        await fs.writeFile(path.join(__dirname, '../../db/users.json'), JSON.stringify(usuariosJson, null, 2));

        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// ---------------------------------------------------------------------------------------------------------------------------------------
const obtenerProductos = async (req, res) => {
    try {
        const productos = await fs.readFile(path.join(__dirname, '../../db/productos.json'));
        const productosJson = JSON.parse(productos);
        res.json(productosJson);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const agregarProducto = async (req, res) => {
    try {
        const { name, price } = req.body;
        const productos = await fs.readFile(path.join(__dirname, '../../db/productos.json'));
        const productosJson = JSON.parse(productos);
        const id = productosJson.productos.length+1;
        const nuevoProducto = { name, price, id };
        

        productosJson.productos.push(nuevoProducto);
        await fs.writeFile(path.join(__dirname, '../../db/productos.json'), JSON.stringify(productosJson, null, 2));
        res.status(201).send(productosJson);
        
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
const actualizarProducto = async (req, res) => {
    try {
        const { name, price, id } = req.body; // Obtener los nuevos datos del producto del cuerpo de la solicitud

        // Leer el archivo JSON que contiene los productos
        const productos = await fs.readFile(path.join(__dirname, '../../db/productos.json'));
        const productosJson = JSON.parse(productos);

        // Buscar el índice del producto que se va a actualizar
        const index = productosJson.productos.findIndex(producto => producto.id == id);

        // Si el producto no se encuentra, devolver un error 404
        if (index === -1) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Actualizar los datos del producto en el array
        productosJson.productos[index].name = name;
        productosJson.productos[index].price = price;

        // Escribir los datos actualizados en el archivo JSON
        await fs.writeFile(path.join(__dirname, '../../db/productos.json'), JSON.stringify(productosJson, null, 2));

        // Devolver una respuesta exitosa con los datos actualizados del producto
        res.status(200).json({ message: 'Producto actualizado correctamente', producto: productosJson.productos[index] });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    console.log(id);
  
    try {
      // Leer el contenido del archivo productos.json
      const productos = await fs.readFile(path.join(__dirname, '../../db/productos.json'), 'utf-8');
      const productosJson = JSON.parse(productos);
  
      // Obtener la lista de productos
      const listaProductos = productosJson.productos;
  
      // Encontrar el índice del producto a eliminar
      const index = listaProductos.findIndex(producto => producto.id === parseInt(id));
      if (index === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  
      // Eliminar el producto del array
      listaProductos.splice(index, 1);
  
      // Escribir los cambios de vuelta al archivo
      await fs.writeFile(path.join(__dirname, '../../db/productos.json'), JSON.stringify(productosJson, null, 2));
  
      res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
// --------------------------------------------------------------------------------------------------------------------------------------- 


module.exports = {

    // consultarUsuario,
    obtenerUsuarios,
    agregarUsuario,
    actualizarUsuario,
    eliminarUsuario,

    // ---------------------------------------------------------------------------------------------------------------------------------------
    consultarUsuario,
    obtenerProductos,
    agregarProducto,
    actualizarProducto,
    eliminarProducto

    // ---------------------------------------------------------------------------------------------------------------------------------------
};

