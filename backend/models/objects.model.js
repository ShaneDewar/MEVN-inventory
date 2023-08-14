module.exports = mongoose => {
    let schema = mongoose.Schema(
        {
            object: String,
            message: String
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;

    });

    const Object = mongoose.model("object", schema);
    return Object;
};