import { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Alert, Modal, Badge } from 'react-bootstrap';
import userService from '../../services/userService';
import Loading from '../../components/Loading';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await userService.getAllUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await userService.deleteUser(deleteId);
      setMessage('User deleted successfully');
      setShowDelete(false);
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to delete user');
    }
  };

  const getRoleBadge = (role) => {
    const variants = { admin: 'danger', instructor: 'primary', student: 'success' };
    return <Badge bg={variants[role] || 'secondary'} className="text-capitalize">{role}</Badge>;
  };

  if (loading) return <Loading />;

  return (
    <Container className="py-4">
      <h2>Manage Users</h2>
      <p className="text-muted">{users.length} total users</p>

      {message && <Alert variant="info" dismissible onClose={() => setMessage('')}>{message}</Alert>}

      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={u._id}>
                  <td>{index + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{getRoleBadge(u.role)}</td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>
                    {u.role !== 'admin' && (
                      <Button variant="outline-danger" size="sm" onClick={() => { setDeleteId(u._id); setShowDelete(true); }}>
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton><Modal.Title>Confirm Delete</Modal.Title></Modal.Header>
        <Modal.Body>Are you sure you want to delete this user? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageUsers;
