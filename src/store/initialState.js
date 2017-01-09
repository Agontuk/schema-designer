const initialState = {
    database: {
        name: 'social_network'
    },
    tables: [
        {
            id: 1,
            name: 'users',
            softDelete: false,
            timeStamp: true
        },
        {
            id: 2,
            name: 'friends',
            softDelete: false,
            timeStamp: true
        }
    ],
    columns: {
        // 1 refers to table ID
        1: [
            {
                name: 'id',
                type: 'integer',
                length: 11,
                defaultValue: null,
                comment: '',
                autoIncrement: true,
                nullable: false,
                unique: true,
                index: true
            },
            {
                name: 'name',
                type: 'varchar',
                length: 40,
                defaultValue: null,
                comment: 'User name',
                autoIncrement: false,
                nullable: false,
                unique: false,
                index: false
            },
            {
                name: 'email',
                type: 'varchar',
                length: 255,
                defaultValue: null,
                comment: 'User email address',
                autoIncrement: false,
                nullable: false,
                unique: true,
                index: false
            },
            {
                name: 'password',
                type: 'varchar',
                length: 50,
                defaultValue: null,
                comment: '',
                autoIncrement: false,
                nullable: false,
                unique: false,
                index: false
            }
        ],
        2: [
            {
                name: 'id',
                type: 'integer',
                length: 11,
                defaultValue: null,
                comment: '',
                autoIncrement: true,
                nullable: false,
                unique: true,
                index: true
            },
            {
                name: 'user_id',
                type: 'integer',
                length: 11,
                defaultValue: null,
                comment: 'User Table ID',
                autoIncrement: false,
                nullable: false,
                unique: false,
                index: false
            },
            {
                name: 'friend_id',
                type: 'integer',
                length: 11,
                defaultValue: null,
                comment: 'Friend ID from users table',
                autoIncrement: false,
                nullable: false,
                unique: false,
                index: false
                // TODO: foreign key relations
            }
        ]
    }
};

export default initialState;
