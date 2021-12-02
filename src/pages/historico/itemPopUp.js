export const itemPopUp = (data) => {
  return `<table style="width:100%;">                
            <tr>
                <th style="width:200px; border: 1px solid #dddddd;   text-align: left;   padding: 8px;"><strong>Nome:</strong></th> 
                <td style="border: 1px solid #dddddd;   text-align: left;   padding: 8px;">${data.item.name}</td>
            </tr> 
            <tr>
                <th style="width:200px; border: 1px solid #dddddd;   text-align: left;   padding: 8px;"><strong>ID:</strong></th>  
                <td style="border: 1px solid #dddddd;   text-align: left;   padding: 8px;">${data.item.item_id}</td>  
            </tr> 
            <tr>
                <th style="width:200px; border: 1px solid #dddddd;   text-align: left;   padding: 8px;"><strong>Local de armazenamento:</strong></th> 
                <td style="border: 1px solid #dddddd;   text-align: left;   padding: 8px;">${data.item.default_storage_location}</td> 
            </tr>
            <tr>
                <th style="width:200px; border: 1px solid #dddddd;   text-align: left;   padding: 8px;"><strong>Descrição:</strong></th>   
                <td style="border: 1px solid #dddddd;   text-align: left;   padding: 8px;">${data.item.description}</td>                           
            </tr>                                 
        </table>
        `;
};
