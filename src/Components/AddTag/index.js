import AsyncSelect from 'react-select/async';
import React, { useState } from 'react';
import { getSuggestions } from 'actions/tagsListSuggestion';
import { useDispatch, useSelector } from 'react-redux';
import setTags from 'actions/tagAction';
import 'Components/AddTag/index.css';

const AddTag = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const tagsSuggestion = useSelector((state) => state.tagsSuggestion.suggestion);

  const handleChange = (selectedTag) => {
    setSelectedTags(selectedTag);
    const tags = selectedTag.map((tag) => (tag.label));
    dispatch(setTags(tags));
    if (selectedTags.length <= 5) {
      setError('');
    }
  };

  const loadOptions = (inputText, callback) => {
    dispatch(getSuggestions(inputText));
    if (selectedTags.length >= 5) {
      setError('Max Tags Selected');
    }
    const taglist = selectedTags.length >= 5 ? [] : tagsSuggestion;

    callback(taglist.map((t) => (
      {
        label: `${t.name}`,
        value: t.id,
      }
    )));
  };

  return (
    <div>
      <div className='p_tag'><p>{error}</p></div>
      <div className='select-box'>
        <AsyncSelect
          isMulti
          value={selectedTags}
          className='group-select'
          onChange={handleChange}
          placeholder='Enter tag name'
          loadOptions={loadOptions}
        />
      </div>
    </div>
  );
};

export default AddTag;
