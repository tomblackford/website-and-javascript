vps = vps || {};

/**
 * Construct a new matrix for the passed translation
 */
vps.TranslationTransformationMatrix = function(position){

	vps.TranslationTransformationMatrix.baseConstructor.call(this);

	this.values[0][3]=position.x;
	this.values[1][3]=position.y;
	this.values[2][3]=position.z;

};

// Extend TransformationMatrix
vps.Utils.extend(vps.TranslationTransformationMatrix, vps.TransformationMatrix);