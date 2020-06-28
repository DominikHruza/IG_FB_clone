import React, { useState } from 'react';
import { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../reducers';
import { AuthUser } from '../../actions/auth';
import { addPost } from '../../actions/post';
import Button from '../../components/Button/Button';
interface AddPostState {
  image: File | any;
  description: string;
}

interface AddPostStateProps {
  user: AuthUser | null;
  addPost: Function;
}

const AddPost: React.FunctionComponent<AddPostStateProps> = ({
  user,
  addPost,
}): JSX.Element => {
  const [file, selectFile] = useState(null);
  const [postData, setPostData] = useState<AddPostState>({
    image: null,
    description: '',
  });
  const fileSelectedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPostData({ ...postData, image: event!.currentTarget!.files![0] });
    console.log(event!.currentTarget!.files![0].name);
  };

  const descInputHandle = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPostData({ ...postData, description: event.target.value });
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('description', postData.description);
    formData.append('userId', user!.id.toString());

    if (postData.image) {
      formData.append('image', postData.image, postData.image.name);
    }

    addPost(formData);
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-8 col-md-offset-2'>
          <h1>Create post</h1>

          <form onSubmit={() => handleSubmit}>
            <div className='input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text' id='inputGroupFileAddon01'>
                  Upload
                </span>
              </div>
              <div className='custom-file'>
                <input
                  type='file'
                  className='custom-file-input'
                  id='inputGroupFile01'
                  aria-describedby='inputGroupFileAddon01'
                  onChange={(e) => fileSelectedHandler(e)}
                />
                <label className='custom-file-label'>
                  {postData.image ? postData.image.name : 'Chose Photo'}
                </label>
              </div>
            </div>

            <div className='form-group'>
              <label>Description</label>
              <textarea
                className='form-control'
                name='description'
                onChange={(e) => descInputHandle(e)}
              ></textarea>
            </div>

            <div className='form-group'>
              <Button type='submit' onClick={handleSubmit}>
                Create
              </Button>
              <button className='btn btn-default'>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }: StoreState) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps, { addPost })(AddPost);
