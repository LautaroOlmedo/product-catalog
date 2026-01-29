

import { productInstance } from "./base.api";

const endpoint = "character";

export const products = {
    getAll: function ({ limit = 10 }: { limit?: number }) {
        return productInstance.get(endpoint, {
            params: {
                limit
            }
            
        })
    },
    getById: function ({ id }: { id: number }) {
        return productInstance.get(`/${id}`)
    },
    update:  function ({ id }: { id: number }) { // -> Send body 
        return productInstance.put(`/${id}`)
    },
    delete:  function ({ id }: { id: number }) {
        return productInstance.delete(`/${id}`)
    },
    
}