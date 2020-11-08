import GenericItem from '@/pages/home/features/cafeteria/entity/GenericItem';
import Field from '@/pages/home/features/cafeteria/Field';

class Cafeteria extends GenericItem {
    constructor({id = null, name = null, display_name = null, support_menu = false, support_discount = false, support_notification = false}) {
        super({});

        this.id = id;
        this.name = name;
        this.display_name = display_name;
        this.support_menu = support_menu;
        this.support_discount = support_discount;
        this.support_notification = support_notification;
    }

    static fields() {
        return [
            new Field('id', 'number', false),
            new Field('name', 'text', true),
            new Field('display_name', 'text', true),
            new Field('support_menu', 'bool', true),
            new Field('support_discount', 'bool', true),
            new Field('support_notification', 'bool', true)
        ];
    }
}

export default Cafeteria;
