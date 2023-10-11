import PropTypes from 'prop-types';
const Profile = ({ name, desc, data, handleEdit, handleDelete }) => (
  <section className="w-full">
    <h1 className="head_text text-left">
      <span className="blue_gradient">{name} Profile </span>
    </h1>
    <p className="desc text-left">{desc}</p>
    <div className="mt-10 prompt_layout">
      {Array.isArray(data) && data.map((post) => (
        <PromptCard
          key={post._id ? post._id : ''}
          post={post}
          handleEdit={() => post && handleEdit && handleEdit(post)}
          handleDelete={() => post && handleDelete && handleDelete(post)}
        />
      ))}
    </div>
  </section>
);

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default Profile;
