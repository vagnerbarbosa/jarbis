package vg.sisnota.datasource.resourcelocal;

import vg.sisnota.models.Supplier;
import java.util.List;

/**
 * Interface SupplierDataSet.
 *
 * @author Vagner Barbosa (contato@vagnerbarbosa.com)
 *
 * @since 03/06/2016
 *
 * @version 1.0
 */
public interface SupplierDataSet {

    /**
     *
     * @param supplier
     */
    public void setSupplier(Supplier supplier);
    
    /**
     *
     * @param id
     */
    public void removeSupplier(Long id);
    
/**
     *
     * @param cnpj
     */
    public void removeSupplierByCnpj(String cnpj);    
    
    /**
     *
     * @param supplier
     */
    public void updateSupplier(Supplier supplier);

    /**
     *
     * @param cnpj
     * @return
     */
    public Supplier getSupplierByCnpj(String cnpj);
    
    /**
     *
     * @param id
     * @return
     */
    public Supplier getSupplierById(Long id);    

    /**
     *
     * @return
     */
    public List<Supplier> getSuppliers();

}
