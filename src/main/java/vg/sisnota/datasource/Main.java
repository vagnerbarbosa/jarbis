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
        
        
        
        //EntityManagerFactory factory = Persistence.createEntityManagerFactory("sisnota");
        Supplier fornecedor = new Supplier(53423434l, "TESTE II", "PB", "CAJAZEIRAS", "CENTRO", "RUA", 0, 0);
        daon.setInvoice(new Invoice(16638227, new Date(), new Date(), fornecedor));
        //dao.setSupplier(fornecedor);
        //Persistence.createEntityManagerFactory("sisnota");
//        Invoice nf = new Invoice();
//        nf.setCnpjFornecedor(dao.getSupplierByCnpj(56095333000104l));
//        nf.setIssuanceDate(new Date());
//        nf.setDateEntry(new Date());
//        nf.setNumber(222222);
//        List<String> imeis = new ArrayList<String>();
//        imeis.add("12164fg8468656");
//        imeis.add("4h89gd4fh4dgf86hdfg");
//        imeis.add("4h89gd4fh4dgf89hdfg");
//        imeis.add("4h89g474674h4dgf86hdfg");
//        imeis.add("4h8945896746456");
//        
//        nf.setImei(imeis);
//        daon.setInvoice(nf);
        System.out.println(daon.getInvoiceByNumber(1663837));
    }
    
}
