import { getFirestore, collection, getDocs, query, where, doc, getDoc, addDoc, increment, updateDoc } from "firebase/firestore";
import { app } from './config'

const db = getFirestore(app);

export const getProductos = async () => {
    const querySnapshot = await getDocs(collection(db, "productos"));
    const productos = []

    querySnapshot.forEach((doc) => {
        productos.push({ id: doc.id, ...doc.data() });  
    });

    return productos;  
}


export const getProductoPorCategoria = async (category) => {
    const productosRef = collection(db, "productos");
    const q = query(productosRef, where("category", "==", category));
    const querySnapshot = await getDocs(q);
    const productos = []

    querySnapshot.forEach((doc) => {
        productos.push({ id: doc.id, ...doc.data() });  
    });

    return productos;  
}

export const getProducto = async (id, setDetail) => {
    try {
        const docRef = doc(db, "productos", id);  
        const docSnap = await getDoc(docRef);  
        
        if (docSnap.exists()) {
            setDetail(docSnap.data());  
        } else {
            console.log("No se encontró el producto con ese ID");
            setDetail(null);  
        }
    } catch (error) {
        console.error("Error al obtener el producto:", error);  
        setDetail(null);
    }
};


export const getProductById = async (id) => {
    try {      
      const productRef = doc(db, "productos", id);  
      const productSnap = await getDoc(productRef);
     
      if (productSnap.exists()) {
        
        return productSnap;
      } else {
       
        console.error("No se encontró el producto con ese ID");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el producto: ", error);
      throw error;
    }
  };

  export const updateProductStock = async (id, quantitySold) => {
    try {     
      const productosRef = doc(db, "productos", id);   
      
      await updateDoc(productosRef, {
        stock: increment(-quantitySold)
      });        
    } catch (error) {
      console.error("Error al actualizar el stock: ", error);
      throw error;
    }
  };

export const createOrder = async (order) => {
    try {
        const docRef = await addDoc(collection(db, "orders"), order);        
        return docRef.id;
        
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  }


