module.exports = mongoose => {
    let schema = mongoose.Schema(
        {
            media: String,
            summary: String
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;

    });

    const Media = mongoose.model("media", schema);
    return Media;
};