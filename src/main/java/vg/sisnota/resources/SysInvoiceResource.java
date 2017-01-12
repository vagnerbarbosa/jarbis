package vg.sisnota.resources;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import vg.sisnota.datasource.jdbc.ConnectionException;
import vg.sisnota.datasource.jdbc.SysInvoiceDataSetImpl;
import vg.sisnota.models.SysInvoice;

/**
 * Classe de recurso para objetos do tipo SysInvoice.
 *
 * @author Vagner Barbosa (contato@vagnerbarbosa.com)
 *
 * @since 03/06/2016
 *
 * @version 1.0
 */
@Path("/nota-entrada")
public class SysInvoiceResource {

    static final String API_VERSION = "1.01A rev.18729";
    static String xmlString = null;
    SysInvoiceDataSetImpl sysInvoiceDataSetImpl;
    ObjectMapper mapper = new ObjectMapper();

    /**
     *
     * @throws vg.sisnota.datasource.jdbc.ConnectionException
     */
    public SysInvoiceResource() throws ConnectionException {
        mapper.enable(DeserializationFeature.ACCEPT_EMPTY_ARRAY_AS_NULL_OBJECT);
        mapper.enable(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT);
        mapper.enable(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY);
        this.sysInvoiceDataSetImpl = new SysInvoiceDataSetImpl();
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
     * @param code
     * @return 
     * @throws java.sql.SQLException
     */
    @Path("{code}")
    @GET
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public ArrayList<SysInvoice> getInvoices(@PathParam("code") String code) throws SQLException {
        System.out.println("Get Invoices...");        
        ArrayList<SysInvoice> notaList = (ArrayList<SysInvoice>) sysInvoiceDataSetImpl.getSysInvoices(code);
        return notaList;
    }

   
}
