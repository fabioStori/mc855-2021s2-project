export const sensorPopUp = (data) => {
  return `<table style="width:100%;">                
            <tr>
                <th style="width:120px; border: 1px solid #dddddd;   text-align: left;   padding: 8px;"><strong>Nome:</strong></th> 
                <td style="border: 1px solid #dddddd;   text-align: left;   padding: 8px;">${data.sensor.name}</td>
            </tr> 
            <tr>
                <th style="width:120px; border: 1px solid #dddddd;   text-align: left;   padding: 8px;"><strong>ID:</strong></th>  
                <td style="border: 1px solid #dddddd;   text-align: left;   padding: 8px;">${data.sensor.sensor_id}</td>  
            </tr> 
            <tr>
                <th style="width:120px; border: 1px solid #dddddd;   text-align: left;   padding: 8px;"><strong>TAG:</strong></th> 
                <td style="border: 1px solid #dddddd;   text-align: left;   padding: 8px;">${data.sensor.tag_id}</td> 
            </tr>
            <tr>
                <th style="width:120px; border: 1px solid #dddddd;   text-align: left;   padding: 8px;"><strong>Descrição:</strong></th>   
                <td style="border: 1px solid #dddddd;   text-align: left;   padding: 8px;">${data.sensor.description}</td>                           
            </tr>                                 
        </table>
        `;
};
