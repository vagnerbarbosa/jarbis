package vg.sisnota.datasource;

import vg.sisnota.model.Supplier;
import vg.sisnota.model.Invoice;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
    public static void main(String[] args) throws Exception {
        SupplierDataSetImpl dao = new SupplierDataSetImpl();
        InvoiceDataSetImpl daon = new InvoiceDataSetImpl(); 
        
        Supplier ss = new Supplier();
        //ss.setCnpj("4.904.042/0004-50");
        
       // System.out.println(ss.getCnpj());
        
        //EntityManagerFactory factory = Persistence.createEntityManagerFactory("sisnota");
        Supplier fornecedor = new Supplier("57.222.305/0001-65", "TESTE UPDATE", "PB", "CAJAZEIRAS", "CENTRO", "RUA", 0, 0l);//        daon.setInvoice(new Invoice(16638227, new Date(), new Date(), fornecedor));
        //dao.setSupplier(fornecedor);
//        System.out.println(dao.getSupplierByCnpj("57.222.305/0001-65"));
//        Persistence.createEntityManagerFactory("sisnota");
        Invoice nf = new Invoice();
        nf.setCnpjFornecedor(dao.getSupplierById(20l));
        nf.setIssuanceDate(new Date());
        nf.setDateEntry(new Date());
        nf.setNumber(222222);
        List<String> imeis = new ArrayList<String>();
        imeis.add("12164fg8468656");
        imeis.add("4h89gd4fh4dgf86hdfg");
        imeis.add("4h89gd4fh4dgf89hdfg");
        imeis.add("4h89g474674h4dgf86hdfg");
        imeis.add("4h8945896746456");
        
        nf.setImei(imeis);
        daon.setInvoice(nf);
//nf = daon.getInvoiceByNumber(222222);
//nf.setNumber(111111);
//daon.removeInvoice(20);
        //System.out.println(daon.getInvoiceByNumber(222222));
    }
    
}
