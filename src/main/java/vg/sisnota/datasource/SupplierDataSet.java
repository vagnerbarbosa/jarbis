package vg.sisnota.datasource;

import vg.sisnota.model.Supplier;
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
     * @param cnpj
     */
    public void removeSupplier(Long cnpj);
    
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
    public Supplier getSupplierByCnpj(Long cnpj);

    /**
     *
     * @return
     */
    public List<Supplier> getSuppliers();

}
