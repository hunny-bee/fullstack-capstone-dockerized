
const PropertySchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    activities: [{
      type: Schema.Types.ObjectId,
      ref: 'Activity',
    }],
    availableDates: [{
      type: Date,
      required: true,
    }],
    images: [{
      type: String,
    }],
    amenities: [{
      type: String,
    }],
    reviews: [{
      type: Schema.Types.ObjectId,
      ref: 'Review',
    }],
  }, { timestamps: true });
  
  module.exports = mongoose.model('Property', PropertySchema);