package vg.sisnota.resource;

import vg.sisnota.datasource.SupplierDataSetImpl;
import vg.sisnota.datasource.InvoiceDataSetImpl;
import vg.sisnota.model.Invoice;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.apache.log4j.Logger;
import vg.sisnota.datasource.SupplierDataSet;

/**
 * Classe de recurso para objetos do tipo Invoice.
 *
 * @author Vagner Barbosa (contato@vagnerbarbosa.com)
 *
 * @since 03/06/2016
 *
 * @version 1.0
 */
@Path("/nota")
public class InvoiceResource {

    static final String API_VERSION = "1.01A rev.18729";
    static Logger logger = Logger.getLogger(SupplierResource.class);
    static String xmlString = null;
    InvoiceDataSetImpl invoiceDataSet;
    SupplierDataSet supplierDataSet;
    ObjectMapper mapper = new ObjectMapper();

    /**
     *
     */
    public InvoiceResource() {
        mapper.enable(DeserializationFeature.ACCEPT_EMPTY_ARRAY_AS_NULL_OBJECT);
        mapper.enable(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT);
        mapper.enable(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY);
        this.invoiceDataSet = new InvoiceDataSetImpl();
        this.supplierDataSet = new SupplierDataSetImpl();
    }

    /**
     *
     * @return
     */
    @Path("/version")
    @GET
    @Produces(MediaType.TEXT_HTML)
    public String returnVersion() {
        return "<p>Version: " + API_VERSION + "</p>";
    }

    /**
     *
     * @return
     */
    @GET
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public ArrayList<Invoice> getInvoices() {
        System.out.println("Get Invoices...");
        ArrayList<Invoice> notaList = (ArrayList<Invoice>) invoiceDataSet.getInvoices();
        return notaList;
    }

    /**
     *
     * @param imei
     * @return
     */
    @Path("{imei}")
    @GET
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Invoice getInvoceByImei(@PathParam("imei") String imei) {
        System.out.println("Geting Invoice by Imei/Id: " + imei);
        Invoice notaFiscal = invoiceDataSet.getInvoiceByGenericSearch(imei);
        return notaFiscal;
    }
    
    /**
     *
     * @param id
     * @return
     */
    @Path("registro/{registro : \\d+}")
    @GET
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Invoice getInvoceById(@PathParam("registro") String id) {
        System.out.println("Geting Invoice by Imei: " + id);
        Invoice notaFiscal = invoiceDataSet.getInvoiceById(Integer.valueOf(id));
        return notaFiscal;
    }    

    /**
     *
     * @param invoice
     * @return
     */
    @Path("{numero}")
    @PUT
    @Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Invoice updateInvoiceByNumber(Invoice invoice) {
        System.out.println("Update invoced, returned: " + invoice.toString());
        invoiceDataSet.updateInvoice(invoice);
        return invoice;
    }

    /**
     *
     * @param id
     */
    @Path("{numero}")
    @DELETE
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public void deleteInvoiceById(@PathParam("numero") Integer id) {
        System.out.println("Deleting Invoce by ID: " + id);
        invoiceDataSet.removeInvoice(id);
    }

    /**
     *
     * @param invoice
     * @return
     */
    @Path("/add")
    @POST
    @Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Invoice invoicePersist(Invoice invoice) {
        System.out.println("Adding Invoice with ID: " + invoice.getNumber());
        if (invoice.getNumber() != null) {
            System.out.println("Inside invoicePersist, returned: " + invoice.toString());
            invoiceDataSet.setInvoice(invoice);
        }
        return invoice;
    }
}
