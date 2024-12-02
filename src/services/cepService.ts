import axios from "axios";

interface Adress{
    "cep":string,
	"logradouro": string,
	"complemento":string,
	"unidade": string,
	"bairro": string,
	"localidade": string,
	"uf":string,
	"estado": string,
	"regiao": string,
	"ibge": string,
	"gia": string,
	"ddd": string,
	"siafi": string
}

export const getAddressByCep = async (cep: string): Promise<Adress> => {
    try{
        const response = await axios.get<Adress>(`http://localhost:3000/api/cep?cep=${cep}`);
        return response.data;
    }catch(error){
        throw new Error("Failed to fetch address from CEP");
    }
}