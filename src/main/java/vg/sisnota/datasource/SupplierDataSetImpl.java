package vg.sisnota.datasource;

import vg.sisnota.model.Supplier;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.Query;

/**
 * Classe de pesistência para objetos do tipo Supplier.
 *
 * @author Vagner Barbosa (contato@vagnerbarbosa.com)
 *
 * @since 03/06/2016
 *
 * @version 1.0
 */
public class SupplierDataSetImpl implements SupplierDataSet {

    private static final EntityManager MANAGER;

    static {
        MANAGER = Persistence.createEntityManagerFactory("sisnota").createEntityManager();
    }

    /**
     *
     * @param supplier
     */
    @Override
    public void setSupplier(Supplier supplier) {        
        MANAGER.getTransaction().begin();
        MANAGER.persist(supplier);
        MANAGER.getTransaction().commit();
    }

    /**
     *
     * @param cnpj
     */
    @Override
    public void removeSupplier(Long cnpj) {
        MANAGER.getTransaction().begin();
        MANAGER.remove(MANAGER.find(Supplier.class, cnpj));
        MANAGER.getTransaction().commit();
    }

    /**
     *
     * @param cnpj
     * @return
     */
    @Override
    public Supplier getSupplierByCnpj(Long cnpj) {        
        MANAGER.getTransaction().begin();
        Supplier supplier = MANAGER.find(Supplier.class, cnpj);
        MANAGER.getTransaction().commit();
        return supplier;
    }

    /**
     *
     * @return
     */
    @Override
    public List<Supplier> getSuppliers() {         
        MANAGER.getTransaction().begin();
        Query query = MANAGER.createQuery("SELECT u FROM Supplier u");
        MANAGER.getTransaction().commit();        
        List<Supplier> suppliers = query.getResultList();
        return suppliers;
    }

    /**
     *
     * @param supplier
     */
    @Override
    public void updateSupplier(Supplier supplier) {
        MANAGER.getTransaction().begin();
        MANAGER.merge(supplier);
        MANAGER.getTransaction().commit();
    }

}
