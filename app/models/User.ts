import { Schema, model } from 'mongoose';
const userSchema = new Schema(
    {
      userName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
    //   tokensArray: { type: Array, required: true, default: [] },
      password: { type: String, required: true},
      isDelete: { type: Boolean, default: false },
    //   blackListedTokens: [{ token: String, createdAt: Date }],
    },
    {
      timestamps: true,
    },
  );
  
  const User = model('User', userSchema);
  export default User;
