package vg.sisnota.resource;

import br.com.caelum.stella.format.CNPJFormatter;
import br.com.caelum.stella.format.Formatter;
import vg.sisnota.datasource.SupplierDataSetImpl;
import vg.sisnota.model.Supplier;
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

/**
 * Classe de recurso para objetos do tipo Supplier.
 *
 * @author Vagner Barbosa (contato@vagnerbarbosa.com)
 *
 * @since 03/06/2016
 *
 * @version 1.0
 */
@Path("/fornecedor")
public class SupplierResource {

    static final String API_VERSION = "1.01A rev.18729";
    static Logger logger = Logger.getLogger(SupplierResource.class);
    static String xmlString = null;
    SupplierDataSetImpl supplierDataSet;
    Formatter formatter = new CNPJFormatter();

    /**
     *
     */
    public SupplierResource() {
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
    public ArrayList<Supplier> getSuppliers() {
        System.out.println("Get all suppliers...");
        ArrayList<Supplier> suppliersList = (ArrayList<Supplier>) supplierDataSet.getSuppliers();
        return suppliersList;
    }

    /**
     *
     * @param cnpj
     * @return
     */
    @Path("{cnpj}")
    @GET
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Supplier getSupplierByCnpj(@PathParam("cnpj") String cnpj) {               
        Formatter formatter = new CNPJFormatter();
        System.out.println("Get Supplier by CNPJ: " + cnpj);
        String formattedCNPJ = formatter.format(cnpj);
        System.out.println("Get Supplier by CNPJ: " + formattedCNPJ);
        Supplier supplier = supplierDataSet.getSupplierByCnpj(formattedCNPJ);
        return supplier;
    }

    /**
     *
     * @param supplier
     * @return
     */
    @Path("{cnpj}")
    @PUT
    @Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Supplier updateSupplierByCnpj(Supplier supplier) {
        System.out.println("Updating Supplier by CNPJ: " + supplier.getCnpj());
        supplierDataSet.updateSupplier(supplier);
        return supplier;
    }

    /**
     *
     * @param cnpj
     */
    @Path("{cnpj}")
    @DELETE
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public void deleteSupplierByCnpj(@PathParam("cnpj") String cnpj) {        
        System.out.println("Get Supplier by CNPJ: " + cnpj);
        String formattedCNPJ = formatter.format(cnpj);
        System.out.println("Get Supplier by CNPJ: " + formattedCNPJ);        
        System.out.println("Deleting supplier by CNPJ: " + formattedCNPJ);
        supplierDataSet.removeSupplierByCnpj(formattedCNPJ);
    }

    /**
     *
     * @param supplier
     * @return
     */
    @Path("/add")
    @POST
    @Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Supplier supplierPersist(Supplier supplier) {
        System.out.println("Adding supplier with cnpj: " + supplier.getCnpj());
        if (supplier.getCnpj() != null && formatter.isFormatted(supplier.getCnpj())) {
            System.out.println("Inside supplierPersist, returned: " + supplier.toString());
            supplierDataSet.setSupplier(supplier);
        } else if (supplier.getCnpj() != null) {
            System.out.println("Inside supplierPersist, returned: " + supplier.toString());
            supplier.setCnpj(formatter.format(supplier.getCnpj()));
            supplierDataSet.setSupplier(supplier);
        }
        return supplier;
    }
}
