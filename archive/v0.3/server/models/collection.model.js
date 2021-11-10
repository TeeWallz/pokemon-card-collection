import bookshelf from '../config/bookshelf';

const TABLE_NAME = 'collections';

/**
 * Collection model.
 */
class Collection extends bookshelf.Model {

    /**
     * Get table name.
     */
    get tableName() {
        return TABLE_NAME;
    }

    /**
     * Table has timestamps.
     */
    get hasTimestamps() {
        return true;
    }

}

export default Collection;