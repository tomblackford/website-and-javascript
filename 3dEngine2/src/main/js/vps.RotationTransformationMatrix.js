vps = vps || {};

/**
 * Construct a new matrix for the passed rotation
 */
vps.RotationTransformationMatrix = function(rotation){
	// Work out the final matrix by multiplying
	// by matrices for each axis rotation
	vps.RotationTransformationMatrix.baseConstructor.call(this);
	
	if(rotation.x!=0){
		this.values[1][1]=Math.cos(rotation.x);
		this.values[1][2]=0-Math.sin(rotation.x);
		this.values[2][1]=Math.sin(rotation.x);
		this.values[2][2]=Math.cos(rotation.x);
	}
	
	if(rotation.y!=0){
		var rotYMatrix = new vps.TransformationMatrix();
		rotYMatrix.values[0][0] = Math.cos(rotation.y);
		rotYMatrix.values[2][0] = 0-Math.sin(rotation.y);
		rotYMatrix.values[0][2] = Math.sin(rotation.y);
		rotYMatrix.values[2][2] = Math.cos(rotation.y);
		
		this.multiply(rotYMatrix);
	}
	
	if(rotation.z!=0){
		var rotZMatrix = new vps.TransformationMatrix();
		rotZMatrix.values[0][0] = Math.cos(rotation.z);
		rotZMatrix.values[1][0] = Math.sin(rotation.z);
		rotZMatrix.values[0][1] = 0-Math.sin(rotation.z);
		rotZMatrix.values[1][1] = Math.cos(rotation.z);
		
		this.multiply(rotZMatrix);
	}
};

// Extend TransformationMatrix
vps.Utils.extend(vps.RotationTransformationMatrix, vps.TransformationMatrix);