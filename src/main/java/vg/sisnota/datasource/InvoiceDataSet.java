package vg.sisnota.datasource;

import vg.sisnota.model.Invoice;
import java.util.List;

/**
 * Interface InvoiceDataSet.
 *
 * @author Vagner Barbosa (contato@vagnerbarbosa.com)
 *
 * @since 03/06/2016
 *
 * @version 1.0
 */
public interface InvoiceDataSet {

    /**
     *
     * @param invoice
     */
    public void setInvoice(Invoice invoice);

    /**
     *
     * @param id
     */
    public void removeInvoice(Integer id);
    
    /**
     *
     * @param invoice
     */
    public void updateInvoice(Invoice invoice);

    /**
     *
     * @param id
     * @return
     */
    public Invoice getInvoiceById(Integer id);
    
    /**
     *
     * @param imei
     * @return
     */
    public Invoice getInvoiceByImei(String imei);
    
    /**
     *
     * @param number
     * @return
     */
    public Invoice getInvoiceByNumber(Integer number);    

    /**
     *
     * @return
     */
    public List<Invoice> getInvoices();

}
