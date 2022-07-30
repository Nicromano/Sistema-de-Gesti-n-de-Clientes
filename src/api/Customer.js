

const API = "https://infofsg.com/mockapi";

const token = localStorage.getItem("token");
export const getCustomers = async () => {
    const responseCustomers = await fetch(`${API}/auth/clientes`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "access-token": token,
        },
    });
    
    const _customers = await responseCustomers.json();
    
    if (_customers.message === "success") {
        let c = _customers.data;
        return c;
    }
    return null;
}

export const deleteCustomer = async (id) => {
    let _customers = null;
    try {
        const responseCustomers = await fetch(`${API}/auth/clientes/delete`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "access-token": token,
            },
            body: JSON.stringify({
                "id": id
            })
        });
        _customers = await responseCustomers.json();
    } catch (error) {
        return false;
    }
    if (_customers.message === "success") {
        return true;
    }
    return false;
}

export const addCustomer = async (customer) => {

    let _customers = null;
    try {
        const responseCustomers = await fetch(`${API}/auth/clientes`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "access-token": token,
            },
            body: JSON.stringify(customer)
        });
        _customers = await responseCustomers.json();
    } catch (error) {
        return false;
    }
    if (_customers.message === "success") {
        return true;
    }
    return false;


}
