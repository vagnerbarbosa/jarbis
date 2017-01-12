package vg.sisnota.datasource.jdbc;

import java.sql.Connection;

/**
 *
 * @author vagner
 */
public class Main {
    
    /**
     *
     * @param args
     * @throws Exception
     */
    private Connection connection;
        
    public static void main(String[] args) throws Exception {
            
        SysInvoiceDataSetImpl dao = new SysInvoiceDataSetImpl();
        ConnectionFactory con = new ConnectionFactory();
        
         
        System.out.println(dao.getSysInvoices("010214"));
        
        

    }
    
}
